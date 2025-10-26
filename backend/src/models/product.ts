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
    minlength: 2,
    maxlength: 30,
    required: true,
    unique: true,
  },
  image: imageSchema,
  category: {
    type: String,
    required: true,
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
