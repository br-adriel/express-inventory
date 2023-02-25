import compression from 'compression';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import logger from 'morgan';
import path from 'path';
import categoryRoutes from './routes/CategoryRoutes';
import itemRoutes from './routes/ItemRoutes';

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

/* Template engine */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/* Middlewares */
app.use(logger('dev'));
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        imgSrc: [`'self'`, `data:`],
        scriptSrc: [`'self'`, `'unsafe-eval'`, `'unsafe-inline'`],
      },
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());

/* Routes */
app.get('/', (req: Request, res: Response) => {
  res.redirect('/category');
});

app.use('/category', categoryRoutes);
app.use('/item', itemRoutes);

/* Página 404 */
app.get('*', (req: Request, res: Response) => {
  res.render('404');
});

/* Error handler */
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createHttpError(404));
});

/* Server */
app.listen(port, () => {
  console.log(`SERVER RUNNING => http://localhost:${port}`);
});
