import express from 'express';
import { createPool } from 'slonik';
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import { DatabaseService, User } from './services/database.service';

config();

const app = express();
const port = 4000;

const pool = createPool(process.env.DATABASE_URL ?? '');
const databaseService = new DatabaseService(pool);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/register', async (req, res) => {
  const { email, username, password } = req.body;

  const userExists = await databaseService.userExists(email, username);

  if (!userExists) {
    const writeUser = await databaseService.writeUser({ email, username, password });
    console.log(req.body);
    res.status(200).json({ writeUser, status: 'Registration successful!' });
  }
  res.status(200).json('Username or email already exists');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const isValidUser = await databaseService.verifyUser(username, password);

  if (isValidUser) {
    const getUserForJwt = (username: string): Promise<User | null> => {
      return databaseService.getUser(username);
    };

    const userJwtPayload = await getUserForJwt(username);

    const userJwt = jwt.sign({ userJwtPayload }, 'test', { expiresIn: '10h' });

    res.status(200).json({ userJwt, status: 'Jwt generated!' });
  }
  res.json('Incorrect user credentials!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
