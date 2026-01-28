import { Router } from 'express';
import { fileMiddleware } from '../middlewares/file';
import { uploadFile } from '../controllers/file';

const uploadRouter = Router();

uploadRouter.post('/', fileMiddleware.single('file'), uploadFile);

export default uploadRouter;