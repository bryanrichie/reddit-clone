import cors from 'cors';
import express, { Request } from 'express';
import jwt from 'jsonwebtoken';
import path from 'path';
import { createPool } from 'slonik';
import { Config, fromEnv } from './config';
import { CustomError, CustomErrors } from './customError';
import { authMiddleware } from './middleware/auth.middleware';
import { errorMiddleware } from './middleware/error.middleware';
import { DatabaseService } from './services/database.service';
import { PostService } from './services/post.service';
import { UserService } from './services/user.service';
import history from 'connect-history-api-fallback';

const config: Config = fromEnv();

const app = express();

const pool = createPool(config.databaseUrl, {
  ssl: config.isProduction ? { rejectUnauthorized: false } : undefined,
});
const databaseService = new DatabaseService(pool);
const userService = new UserService(databaseService);
const postService = new PostService(databaseService);

app.use(
  history({
    disableDotRule: true,
    index: '/index.html',
    htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
  })
);

app.use(cors());
app.use(express.json());

app.get('/', authMiddleware, async (req: Request, res, next) => {
  try {
    const posts = await postService.getPosts(req.user.id);

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

app.post('/register', async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    await userService.registerUser(email, username, password);

    const userJwtPayload = await userService.getUserForJwt(username, password);

    if (!userJwtPayload) {
      throw new CustomError({
        type: CustomErrors.InternalServerError,
        message: 'Internal server error',
      });
    }

    const userJwt = jwt.sign(userJwtPayload, config.jwtSecret, { expiresIn: '10h' });

    res.status(200).json(userJwt);
  } catch (error) {
    next(error);
  }
});

app.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const userJwtPayload = await userService.getUserForJwt(username, password);

    if (!userJwtPayload) {
      throw new CustomError({
        type: CustomErrors.InternalServerError,
        message: 'Internal server error',
      });
    }

    const userJwt = jwt.sign(userJwtPayload, config.jwtSecret, { expiresIn: '10h' });

    res.status(200).json(userJwt);
  } catch (error) {
    next(error);
  }
});

app.post('/post/create', authMiddleware, async (req: Request, res, next) => {
  try {
    const { title, text, url } = req.body;

    const post = await postService.createPost({
      userId: req.user.id,
      title,
      text: text ?? null,
      url: url ?? null,
    });

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
});

// app.post('/post/delete', async (req, res, next) => {
//   try {
//     const { postId, userId } = req.body;

//     const deletedPost = await postService.deletePost(postId, userId);

//     res.status(200).json({ deletedPost, status: 'Post successfully deleted.' });
//   } catch (error) {
//     next(error);
//   }
// });

// app.post('/post/edit', async (req, res, next) => {
//   try {
//     const { postId, title, text, url } = req.body;

//     const editedPost = await postService.editPost(postId, { title, text, url });

//     res.status(200).json({ editedPost, status: 'Post successfully edited.' });
//   } catch (error) {
//     next(error);
//   }
// });

app.get('/post/:postId', authMiddleware, async (req, res, next) => {
  try {
    const { postId: id } = req.params;

    const post = await postService.getPost({
      userId: req.user.id,
      id,
    });

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
});

app.post('/posts/:postId/comments/add', authMiddleware, async (req: Request, res, next) => {
  try {
    const comment = await postService.addComment({
      userId: req.user.id,
      postId: req.body.postId,
      comment: req.body.comment,
    });

    res.status(200).json({ comment });
  } catch (error) {
    next(error);
  }
});

app.get('/posts/:postId/comments', authMiddleware, async (req: Request, res, next) => {
  try {
    const { postId } = req.params;

    const comments = await postService.getComments(postId);

    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
});

app.post('/posts/:postId/votes/add', authMiddleware, async (req: Request, res, next) => {
  try {
    const vote = await postService.addPostVote({
      userId: req.user.id,
      postId: req.body.postId,
      vote: req.body.vote,
    });

    res.status(200).json({ vote });
  } catch (error) {
    next(error);
  }
});

app.post('/posts/:postId/votes/update', authMiddleware, async (req: Request, res, next) => {
  try {
    const vote = await postService.updatePostVote({
      userId: req.user.id,
      postId: req.body.postId,
      vote: req.body.vote,
    });

    res.status(200).json({ vote });
  } catch (error) {
    next(error);
  }
});

app.post('/posts/:postId/votes/delete', authMiddleware, async (req: Request, res, next) => {
  try {
    const vote = await postService.deletePostVote({
      userId: req.user.id,
      postId: req.body.postId,
    });

    res.status(200).json({ vote });
  } catch (error) {
    next(error);
  }
});

if (config.isProduction) {
  const p = path.join(__dirname, '../../../client/dist');
  app.use(express.static(p));
}

app.use(errorMiddleware);

app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`);
});
