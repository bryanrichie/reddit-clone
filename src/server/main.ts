import express from 'express';
import { createPool } from 'slonik';
import { config } from 'dotenv';
import { DatabaseService } from './services/database.service';

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
    res.json({ writeUser, status: 'Registration successful!' });
  }
  res.json('Username or email already exists');
});

// TODO
// post route for login
// it checks that credentials are valid
// if they aren't valid, return an error
// if they are valid, generate a JWT and send it back to the user
// log them in

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
