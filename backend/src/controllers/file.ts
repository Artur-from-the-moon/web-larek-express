import { Request, Response, NextFunction } from "express";

export const uploadFile = (req: Request, res: Response, next: NextFunction) => {
  const file = req.file;

  if(!file) {
    next(new Error('Ошибка при загрузке файла'));
    return;
  }

  res.send({
    fileName: '/images/' + file.filename,
    originalName: file.originalname
  })
}