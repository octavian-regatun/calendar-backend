import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();

if (!process.env.PORT) {
  throw new Error('Please initialize .env PORT');
}

const PORT: number = 8080 || process.env.PORT;

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(PORT, () => {
  console.log(`App running on PORT: ${PORT}`);
});
