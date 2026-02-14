import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import AuthError from '../errors/auth-error';

export default (req: Request, _res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token, config.ACCESS_KEY);
  } catch (error) {
    return next(new AuthError('Необходима авторизация'));
  }

  (req as any).user = payload;

  return next();
};
