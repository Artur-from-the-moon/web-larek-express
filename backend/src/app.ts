import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';
import { errors } from 'celebrate';
import userRouter from './routes/user';
import productsRouter from './routes/products';
import ordersRouter from './routes/order';
import uploadRouter from './routes/upload';
import NotFoundError from './errors/not-found-error';
import errorHandler from './middlewares/error-handler';
import { requestLogger, errorLogger } from './middlewares/logger';
import config from './config';

const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

app.use(cors({
  origin: config.ORIGIN_ALLOW,
  credentials: true,
}));

app.use(express.json());

mongoose.connect(config.DB_ADDRESS);

app.use(requestLogger);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', userRouter);
app.use('/product', productsRouter);
app.use('/order', ordersRouter);
app.use('/upload', uploadRouter);

app.use('*', (_req: Request, _res: Response, next: NextFunction) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`listening on port ${config.PORT}`);
});
