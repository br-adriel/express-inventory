import { Request, Response } from 'express';

const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send("it's working");
});

app.listen(port, () => {
  console.log(`SERVER RUNNING => http://localhost:${port}`);
});
