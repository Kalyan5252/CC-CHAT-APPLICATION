import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import appError from './utility/appError.js';
import errorHandler from './controllers/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { app, server } from './socket/socket.js';

// const app = express();
dotenv.config();

// process.on('uncaughtException', (err) => {
//   console.log('UNCAUGHT EXCEPTION!');
//   console.log(err.name, err.message);
//   process.exit(1);
// });

const db = process.env.DATABASE.replace('<password>', process.env.PASSWORD);
mongoose
  .connect(db)
  .then(() => {
    console.log('Connection to Database established Successfully');
  })
  .catch((err) => {
    console.log(
      `Cannot establish connection to Database\nError Occured:${err}`
    );
  });

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth/', authRoutes);
app.use('/api/message/', messageRoutes);
app.use('/api/users/', userRoutes);

app.all('*', (req, res, next) => {
  next(new appError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

const port = process.env.PORT || 8800;
server.listen(port, () => {
  console.log(`server initialized via ${port}`);
});

// process.on('unhandledRejection', (err) => {
//   console.log('UNHANDLED REJECTION!');
//   console.log(err.name, err.message);
//   server.close(() => {
//     process.exit(1);
//   });
// });
