import dotenv from 'dotenv';
import express from 'express';

import { connectToDB } from './src/db/connectDB';

dotenv.config();

const app = express();

if (!process.env.PORT) {
  throw new Error('Add PORT field to .env file');
}

const PORT: number = 8080 || process.env.PORT;

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(PORT, () => {
  console.log(`App running on PORT: ${PORT}`);
});


void connectToDB();