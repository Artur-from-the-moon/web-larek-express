import { NextFunction, Request, Response } from "express";
import Product from '../models/product';
import ConflictError from '../errors/conflict-error';

export const getProducts = (req: Request, res: Response, next: NextFunction) => {
  Product.find({})
    .then((products) => res.send({ 
      items: products,
      total: products.length
    }))
    .catch((error) => next(error));  
}

export const createProduct = (req: Request, res: Response, next: NextFunction) => {
  const { description, image, title, category, price } = req.body;
  Product.create({description, image, title, category, price})
    .then((product) => res.send({ data: product }))
    .catch((error) => {
      if (error instanceof Error && error.message.includes('E1100')) {
        return next(new ConflictError('Товар с таким заголовком уже существует'));
      }
      next(error);
    })
}