import express from 'express';
import mongoose from 'mongoose';

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/weblarek');

app.listen(3000, () => { console.log('listening on port 3000'); });
