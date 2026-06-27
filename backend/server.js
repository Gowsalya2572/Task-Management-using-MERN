import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

dotenv.config();

connectDB();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from the Express.js server!');
});

app.use('/task/auth', authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server started Successfully!! ${process.env.PORT}`);
});