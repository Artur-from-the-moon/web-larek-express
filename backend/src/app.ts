import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';
import userRouter from './routes/user';
import productsRouter from './routes/products';
import ordersRouter from './routes/order';
import errorHandler from './middlewares/error-handler';
import { errors } from 'celebrate';
import { requestLogger, errorLogger } from './middlewares/logger';
import { config } from './config';
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

app.use(cors({
  origin: config.ORIGIN_ALLOW,
  credentials: true
}));

app.use(express.json());

mongoose.connect(config.DB_ADDRESS);

app.use(requestLogger);

app.use('/auth', userRouter);
app.use('/product', productsRouter);
app.use('/order', ordersRouter);

app.use(errorLogger);

app.use(express.static(path.join(__dirname, 'public')));

app.use(errors());
app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`listening on port ${config.PORT}`);
});
