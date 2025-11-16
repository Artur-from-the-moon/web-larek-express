import { Request, Response } from "express";
import Product from '../models/product';

export const getProducts = (req: Request, res: Response) => {
  Product.find({})
    .then((products) => res.send({ 
      items: products,
      total: products.length 
    }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

export const createProduct = (req: Request, res: Response) => {
  const { description, image, title, category, price } = req.body;
  Product.create({description, image, title, category, price})
    .then((product) => res.send({ data: product }))
    .catch((error) => {
      console.error('Ошибка создания продукта', error)
      res.status(500).send({ message: `Произошла ошибка: ${error.message}` })
    })
}