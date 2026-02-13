import { NextFunction, Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';
import Product from '../models/product';
import ConflictError from '../errors/conflict-error';
import NotFoundError from '../errors/not-found-error';

export const getProducts = (_req: Request, res: Response, next: NextFunction) => Product.find({})
  .then((products) => res.send({
    items: products,
    total: products.length,
  }))
  .catch((error) => next(error));

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  const {
    description, image, title, category, price,
  } = req.body;

  if (image) {
    try {
      await fs.rename(path.join(__dirname, '../../uploads', image.fileName), path.join(__dirname, '../public', image.fileName));
    } catch (error) {
      next(error);
    }
  }

  return Product.create({
    description, image, title, category, price,
  })
    .then((product) => res.send({ data: product }))
    .catch((error) => {
      if (error instanceof Error && error.message.includes('E11000')) {
        return next(new ConflictError('Товар с таким заголовком уже существует'));
      }
      return next(error);
    });
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.params;
  const {
    description, image, title, category, price,
  } = req.body;

  if (image) {
    try {
      await fs.rename(path.join(__dirname, '../../uploads', image.fileName), path.join(__dirname, '../public', image.fileName));
    } catch (error) {
      next(error);
    }
  }

  return Product.findByIdAndUpdate(productId, {
    description, image, title, category, price,
  }, { new: true })
    .then((product) => {
      if (!product) {
        return next(new NotFoundError('Товар не найден'));
      }
      return res.send({ data: product });
    })
    .catch((error) => {
      if (error instanceof Error && error.message.includes('E11000')) {
        return next(new ConflictError('Товар с таким заголовком уже существует'));
      }
      return next(error);
    });
};

export const deleteProduct = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Product.findByIdAndDelete(req.params.productId)
  .then((product) => {
    if (!product) {
      return next(new NotFoundError('Товар не найден'));
    }
    return res.send({ data: product });
  })
  .catch((error) => {
    next(error);
  });
