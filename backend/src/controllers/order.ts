import { NextFunction, Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import { isEmail } from 'validator';
import Product from '../models/product';
import BadRequestError from '../errors/bad-request-error';

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      payment, email, phone, address, total, items,
    } = req.body;

    const products = await Product.find({ _id: { $in: items } });
    const productsIds = products.map((product) => product._id.toString());
    const totalPrice = products.reduce((sum, product) => sum + product.price, 0);

    if (!Array.isArray(items) || items.length === 0) {
      return next(new BadRequestError('Массив с id товаров пуст'));
    }

    for (const item of items) {
      if (!productsIds.includes(item)) {
        return next(new BadRequestError(`Продукт ${item} не найден`));
      }
    }

    for (const product of products) {
      if (product.price === null) {
        return next(new BadRequestError(`Продукт ${product._id} не продается`));
      }
    }

    if (!total || total !== totalPrice) {
      return next(new BadRequestError('Стоимость переданных товаров не равна стоимости заказа'));
    }

    if (!['card', 'online'].includes(payment)) {
      return next(new BadRequestError('Форма оплаты должна быть card либо online'));
    }

    if (!isEmail(email)) {
      return next(new BadRequestError('Некорректный email-адрес'));
    }

    if (typeof phone !== 'string') {
      return next(new BadRequestError('Номер телефона должен быть строкой'));
    } if (!phone || phone.trim().length === 0) {
      return next(new BadRequestError('Не введен номер телефона'));
    }

    if (typeof address !== 'string') {
      return next(new BadRequestError('Адрес должен быть строкой'));
    } if (!address || address.trim().length === 0) {
      return next(new BadRequestError('Не введен адрес'));
    }

    const orderId = faker.string.uuid();

    return res.status(200).send({
      id: orderId,
      total,
    });
  } catch (error) {
    next(error);
  }
};
