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
  const { email, username, password } = req.body;

  const userExists = await databaseService.userExists(email, username);

  if (!userExists) {
    const registerUser = await userService.registerUser({ email, username, password });

    res.status(200).json({ registerUser, status: 'Registration successful!' });
  }
  res.json('Username or email already exists');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const validUser = await databaseService.validUser(username, password);

  if (validUser) {
    const userJwtPayload = await userService.getUserForJwt(username);

    const userJwt = jwt.sign({ userJwtPayload }, config.jwtSecret, { expiresIn: '10h' });

    res.status(200).json({ userJwt, status: 'Jwt generated!' });
  }
  res.status(401).json('Incorrect user credentials!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
