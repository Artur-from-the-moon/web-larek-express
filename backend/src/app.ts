import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import router from './routes/products';

const app = express();

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/weblarek');

app.use('/products', router);

app.use(express.static(path.join(__dirname, 'public')));
app.listen(3000, () => {
  console.log('listening on port 3000');
});
