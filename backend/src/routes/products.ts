import { Router } from 'express';
import { createProduct, getProducts, updateProduct, deleteProduct } from '../controllers/products';
import { validateProductBody } from '../middlewares/validatons';
import { validateUpdateProductBody } from '../middlewares/validatons';


const router = Router();

router.get('/', getProducts);
router.post('/', validateProductBody, createProduct);
router.patch('/:productId', validateUpdateProductBody, updateProduct);
router.delete('/:productId', deleteProduct)

export default router;
