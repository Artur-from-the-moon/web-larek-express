import { Router, Request, Response } from 'express';
import Product from '../models/product';

const router = Router();
router.get('/', (req: Request, res: Response) => {
  Product.find({})
    .then((products) => res.send({ data: products }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
});

router.post('/', (req: Request, res: Response) => {
  Product.create(
    {
      "description": "Будет стоять над душой и не давать прокрастинировать.",
      "image": {
        fileName: "/images/Asterisk_2.png",
        originalName: "Asterisk_2.png"
      },
      "title": "Мамка-таймер",
      "category": "софт-скил",
      "price": null
    },
  )
    .then((product) => res.send({ data: product }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }))
});

export default router;
