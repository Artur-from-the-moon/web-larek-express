import { Request, Response, NextFunction } from 'express';

function errorHandler(error: any, _req: Request, res: Response, _next: NextFunction) {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Внутрення ошибка сервера';
  const errorResponse = { message };

  res.status(statusCode).send(errorResponse);
}

export default errorHandler;
