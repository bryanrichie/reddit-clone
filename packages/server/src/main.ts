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

app.delete('/posts/:postId', authMiddleware, async (req: Request, res, next) => {
  try {
    const { postId } = req.params;

    const deletedPost = await postService.deletePost({ postId });

    res.status(200).json(deletedPost);
  } catch (error) {
    next(error);
  }
});

app.get('/posts/:postId', authMiddleware, async (req, res, next) => {
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
    const userId = req.user.id;

    const comments = await postService.getComments(postId, userId);

    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
});

app.post('/comments/:parentId/replies/add', authMiddleware, async (req: Request, res, next) => {
  try {
    const reply = await postService.addReply({
      userId: req.user.id,
      postId: req.body.postId,
      parentId: req.body.parentId,
      reply: req.body.reply,
    });

    res.status(200).json({ reply });
  } catch (error) {
    next(error);
  }
});

app.get('/comments/:parentId/replies', authMiddleware, async (req: Request, res, next) => {
  try {
    const { parentId } = req.params;
    const userId = req.user.id;

    const replies = await postService.getReplies(parentId, userId);

    res.status(200).json(replies);
  } catch (error) {
    next(error);
  }
});

app.post('/comments/:parentId/vote/add', authMiddleware, async (req: Request, res, next) => {
  try {
    const vote = await postService.addCommentVote({
      userId: req.user.id,
      commentId: req.body.commentId,
      vote: req.body.vote,
    });

    res.status(200).json({ vote });
  } catch (error) {
    next(error);
  }
});

app.post('/comments/:parentId/vote/update', authMiddleware, async (req: Request, res, next) => {
  try {
    const vote = await postService.updateCommentVote({
      userId: req.user.id,
      commentId: req.body.commentId,
      vote: req.body.vote,
    });

    res.status(200).json({ vote });
  } catch (error) {
    next(error);
  }
});

app.post('/comments/:parentId/vote/delete', authMiddleware, async (req: Request, res, next) => {
  try {
    const vote = await postService.deleteCommentVote({
      userId: req.user.id,
      commentId: req.body.commentId,
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
  console.log(`Reddit Clone listening on port ${config.port}`);
});
