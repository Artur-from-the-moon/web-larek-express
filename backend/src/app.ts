import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';
import productsRouter from './routes/products';
import ordersRouter from './routes/order';
import errorHandler from './middlewares/error-handler';
import { errors } from 'celebrate'; 

const app = express();
app.use(cors());

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/weblarek');

app.use('/product', productsRouter);
app.use('/order', ordersRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.use(errors());
app.use(errorHandler);

app.listen(3000, () => {
  console.log('listening on port 3000');
});
