import { Request, Response } from 'express';

export const createOrder = (req: Request, res: Response ) => {
	const { payment, email, phone, address, total, items } = req.body;

	return 
}