import { Router } from 'express';
import {
  createProduct, getProducts, updateProduct, deleteProduct,
} from '../controllers/products';
import { validateProductBody, validateObjId, validateUpdateProductBody } from '../middlewares/validatons';

import auth from '../middlewares/auth';

const router = Router();

router.get('/', getProducts);
router.post('/', auth, validateProductBody, createProduct);
router.patch('/:productId', auth, validateObjId, validateUpdateProductBody, updateProduct);
router.delete('/:productId', auth, validateObjId, deleteProduct);

export default router;
