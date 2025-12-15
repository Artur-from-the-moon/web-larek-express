import Joi from 'joi';
import { celebrate, Segments } from 'celebrate';

const orderSchema = Joi.object({
  items: Joi.array().min(1),
  total: Joi.number().required(),
  payment: Joi.string().valid('card', 'online').required().messages({
    'any.only': 'форма оплаты должна быть Card, либо Online',
    'any.required': 'payment это обязательное поле'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Некорректный email-адрес',
    'string.empty': 'Поле email не может быть пустым',
    'any.required': 'email это обязательное поле'
  }),
  phone: Joi.string().required().messages({
    'string.base': 'phone должен быть string',
    'string.empty': 'Поле phone не может быть пустым',
    'any.required': 'phone это обязательное поле'
  }),
  address: Joi.string().required().messages({
    'string.base': 'address должен быть string',
    'string.empty': 'Поле address не может быть пустым',
    'any.required': 'address это обязательное поле'
  }),
});

export const validateOrderBody = celebrate({
  [Segments.BODY]: orderSchema
});

const productSchema = Joi.object({
  title: Joi.string().min(2).max(30).required().messages({
    'any.required': 'Поле title должно быть заполнено',
    'string.min': 'Минимальная длина поля title - 2',
    'string.max': 'Максимальная длина поля title - 30',
    'string.empty': 'Поле title не может быть пустым',
  }),
  image: Joi.object({
    fileName: Joi.string().messages({
      'string.base': 'fileName должен быть string',
    }),
    originalName: Joi.string().messages({
      'string.base': 'originalName должен быть string',
    })
  }).required(),
  category: Joi.string().required().messages({
    'string.base': 'category должен быть string',
    'any.required': 'category это обязательное поле',
    'string.empty': 'Поле category не может быть пустым',
  }),
  description: Joi.string().messages({
    'string.base': 'description должен быть string',
    'string.empty': 'Поле description не может быть пустым',
  }),
  price: Joi.number().messages({
    'number.base': 'price должен быть number',
    'string.empty': 'Поле price не может быть пустым',
  }).default(null)
});

export const validateProductBody = celebrate({
  [Segments.BODY]: productSchema
});