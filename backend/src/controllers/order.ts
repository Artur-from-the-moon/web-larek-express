import { Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import Product from '../models/product';
import { isEmail } from 'validator';

export const createOrder = async (req: Request, res: Response ) => {
	try {
		const { payment, email, phone, address, total, items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Массив с id товаров пуст' });
    }

    const products = await Product.find({ _id: { $in: items} })
    const productsIds = products.map(product => product._id.toString())
    const totalPrice = products.reduce((sum, product) => {
      return sum + product.price
    }, 0)

    for (let item of items) {
      if (!productsIds.includes(item)) {
        return res.status(400).send({ message: `Продукт ${item} не найден` })
      }
    }

    for (let product of products) {
      if(product.price === null) {
        return res.status(400).send({ message: `Продукт ${product._id} не продается` })
      }
    }

    if (!total || total !== totalPrice) {
      return res.status(400).send({ message: 'Стоимость переданных товаров не равна стоимости заказа' })
    }

    if (!['card', 'online'].includes(payment)) {
      return res.status(400).send({ message: 'Форма оплаты должна быть card либо online' })
    }

    function validateEmail (email: any) {
      let error = null;
      if (!isEmail(email)) {
        error = 'Некорректный email-адрес'
      }
      return error;
    }

    const errorEmail = validateEmail(email)
    if (errorEmail) {
      return res.status(400).send({ message: errorEmail})
    }

    if (typeof phone !== 'string') {
      return res.status(400).send({ message: 'Номер телефона должен быть строкой' })
    } else if (!phone || phone.trim().length === 0) {
      return res.status(400).send({ message: 'Не введен номер телефона' })
    }

    if (typeof address !== 'string') {
      return res.status(400).send({ message: 'Адрес должен быть строкой' })
    } else if (!address || address.trim().length === 0) {
      return res.status(400).send({ message: 'Не введен адрес' })
    }
    
    const orderId = faker.string.uuid();
  
    return res.status(200).send({
      "id": orderId,
      "total": total,
    })
	} catch (error) {
		console.error('Ошибка создания заказа', error);
		res.status(500).send({ message: `Ошибка при создании заказа` });
	}
}