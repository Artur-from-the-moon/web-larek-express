import { Request, Response, NextFunction } from 'express';
import config from '../config';

const uploadFile = (req: Request, res: Response, next: NextFunction) => {
  const { file } = req;

  if (!file) {
    next(new Error('Ошибка при загрузке файла'));
    return;
  }

  res.send({
    fileName: `/${config.UPLOAD_PATH}/${file.filename}`,
    originalName: file.originalname,
  });
};

export default uploadFile;
