import compression from 'compression';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import path from 'path';

/* Environment variables configuration */
dotenv.config();

/* App inicialization and variables */
const app = express();
const port = process.env.PORT || 3000;

/* Database connection */
mongoose.set('strictQuery', false);
const mongoDB = process.env.DB_URL;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB || '');
}

/* Middlewares */
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());

/* Routes */
app.get('/', (req: Request, res: Response) => {
  res.send("it's working");
});

/* Server */
app.listen(port, () => {
  console.log(`SERVER RUNNING => http://localhost:${port}`);
});
