import express from 'express';
import { createPool } from 'slonik';
import jwt from 'jsonwebtoken';
import { DatabaseService } from './services/database.service';
import { UserService } from './services/user.service';
import { PostService } from './services/post.service';
import { Config, fromEnv } from './config';
import { errorMiddleware } from './middleware/error.middleware';
import { CustomError } from './customError';

const config: Config = fromEnv();

const app = express();
const port = 4000;

const pool = createPool(process.env.DATABASE_URL ?? '');
const databaseService = new DatabaseService(pool);
const userService = new UserService(databaseService);
const postService = new PostService(databaseService);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/user/register', async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    const user = await userService.registerUser(email, username, password);

    res.status(200).json({ user, status: 'Registration successful.' });
  } catch (error) {
    next(error);
  }
});

app.post('/user/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const userJwtPayload = await userService.getUserForJwt(username, password);

    const userJwt = jwt.sign({ userJwtPayload }, config.jwtSecret, { expiresIn: '10h' });

    res.status(200).json({ userJwt, status: 'Authentication successful, logging in.' });
  } catch (error) {
    next(error);
  }
});

app.post('/user/update', async (req, res, next) => {
  try {
    const { userId, email, username, password } = req.body;

    const updatedUser = await userService.updateUser(userId, email, username, password);

    res.status(200).json({ updatedUser, status: 'User successfully updated.' });
  } catch (error) {
    next(error);
  }
});

app.post('/post/create', async (req, res, next) => {
  try {
    const { userId, title, body, image } = req.body;

    const post = await postService.createPost(userId, title, body, image);

    res.status(200).json({ post, status: 'Successfully posted.' });
  } catch (error) {
    next(error);
  }
});

app.post('/post/delete', async (req, res, next) => {
  try {
    const { postId, userId } = req.body;

    const deletedPost = await postService.deletePost(postId, userId);

    res.status(200).json({ deletedPost, status: 'Post successfully deleted.' });
  } catch (error) {
    next(error);
  }
});

app.post('/post/edit', async (req, res, next) => {
  try {
    const { postId, userId, title, body, image } = req.body;

    const editedPost = await postService.editPost(postId, userId, title, body, image);

    res.status(200).json({ editedPost, status: 'Post successfully edited.' });
  } catch (error) {
    next(error);
  }
});

app.post('/post/:postId', async (req, res, next) => {
  try {
    const { postId } = req.body;

    const post = await postService.servePost(postId);

    res.status(200).json({ post });
  } catch (error) {
    next(error);
  }
});

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
