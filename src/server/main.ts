import express from 'express';
import { createPool } from 'slonik';
import jwt from 'jsonwebtoken';
import { DatabaseService } from './services/database.service';
import { UserService } from './services/user.service';
import { Config, fromEnv } from './config';

const config: Config = fromEnv();

const app = express();
const port = 4000;

const pool = createPool(process.env.DATABASE_URL ?? '');
const databaseService = new DatabaseService(pool);
const userService = new UserService(databaseService);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/register', async (req, res) => {
  try {
    const { email, username, password } = req.body;

    await userService.registerUser(email, username, password);

    const user = await userService.getUserForJwt(username);

    res.status(200).json({ user, status: 'Registration successful!' });
  } catch (err) {
    res.status(400).json({ err: `User already exists.` });
  }
});

app.post('/login', async (req, res) => {
  const { username } = req.body;

  const userJwtPayload = await userService.getUserForJwt(username);

  if (!userJwtPayload) {
    res.status(401).json('Incorrect user credentials!');
  }

  const userJwt = jwt.sign({ userJwtPayload }, config.jwtSecret, { expiresIn: '10h' });

  res.status(200).json({ userJwt, status: 'Jwt generated!' });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
