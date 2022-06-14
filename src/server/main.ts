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

const config: Config = fromEnv();

const app = express();
const port = process.env.PORT || 8080;

const pool = createPool(process.env.DATABASE_URL ?? '');
const databaseService = new DatabaseService(pool);
const userService = new UserService(databaseService);
const postService = new PostService(databaseService);

app.use(cors());
app.use(express.json());

app.get('/', authMiddleware, async (req: Request, res, next) => {
  try {
    const posts = await postService.getPosts();

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

app.get('/protected', authMiddleware, async (req: Request, res, next) => {
  try {
    const users = await userService.getUsers();

    res.status(200).json(users);
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

// app.post('/user/update', async (req, res, next) => {
//   try {
//     const { userId, email, username, password } = req.body;

//     const updatedUser = await userService.updateUser(userId, email, username, password);

//     res.status(200).json({ updatedUser, status: 'User successfully updated.' });
//   } catch (error) {
//     next(error);
//   }
// });

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
    const { postId } = req.params;

    const post = await postService.getPost(postId);

    res.status(200).json({ post });
  } catch (error) {
    next(error);
  }
});

app.post('/comment/add', authMiddleware, async (req: Request, res, next) => {
  try {
    const { comment } = req.body;

    const userComment = await postService.addComment({
      userId: req.user.id,
      postId: req.post.id,
      comment,
    });

    res.status(200).json({ userComment });
  } catch (error) {
    next(error);
  }
});

app.get('/comments', authMiddleware, async (req: Request, res, next) => {
  try {
    const { postId } = req.params;

    const comments = await postService.getComments(postId);

    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
});

app.use(errorMiddleware);

if (config.isProduction) {
  app.use(express.static(path.join(__dirname, '../client')));
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
