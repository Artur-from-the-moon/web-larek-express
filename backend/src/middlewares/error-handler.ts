import { Response } from 'express';

function errorHandler(error: any, res: Response) {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Внутрення ошибка сервера';
  const errorResponse = { message };

  res.status(statusCode).send(errorResponse);
}

export default errorHandler;
