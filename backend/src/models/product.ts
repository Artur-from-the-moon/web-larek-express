import mongoose from 'mongoose';

interface IImage {
  fileName: string;
  originalName: string
}

interface IProduct {
  title: string;
  image: IImage;
  category: string;
  description: string;
  price: number;
}

const imageSchema = new mongoose.Schema<IImage>({
  fileName: String,
  originalName: String,
});

const productSchema = new mongoose.Schema<IProduct>({
  title: {
    type: String,
    minlength: [2, 'Минимальная длина поля "title" - 2'],
    maxlength: [30, 'Максимальная длина поля "title" - 30'],
    required: [true, 'Поле "title" должно быть заполнено'],
    unique: true,
  },
  image: imageSchema,
  category: {
    type: String,
    required: [true, 'Поле "category" должно быть заполнено'],
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
    default: null,
  },
});

export default mongoose.model<IProduct>('Product', productSchema);
