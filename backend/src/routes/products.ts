import { Router } from 'express';
import { createProduct, getProducts, updateProduct, deleteProduct } from '../controllers/products';
import { validateProductBody } from '../middlewares/validatons';
import { validateUpdateProductBody } from '../middlewares/validatons';
import auth from '../middlewares/auth';


const router = Router();

router.get('/', getProducts);
router.post('/', auth, validateProductBody, createProduct);
router.patch('/:productId', auth, validateUpdateProductBody, updateProduct);
router.delete('/:productId', auth, deleteProduct)

export default router;
