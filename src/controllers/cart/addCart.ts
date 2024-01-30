import { Request, Response } from 'express';
import EcCart from '../../models/ec_cart';

const addCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = req.body as { _id: string; quantity: number }[];
        const { registrationId } = req.body.jwt_decoded;

        if (!products || !Array.isArray(products)) {
            res.status(422).json({ error: 'Bad request' });
        }

        const createData = [];
        for (const product of products) {
            if (!product._id || !product.quantity) {
                res.status(422).json({ error: 'Product not found' });
            }
            const Data = await EcCart.create({ product_id: product._id, registration_id: registrationId, quantity: product.quantity }, { raw: true });
            createData.push(Data);
        }
        res.status(200).json({ message: 'Data inserted succesfully ', createData })
    }
    catch (error: any) {
        res.status(500).json({ error: error.toString() });
    }
};

export default addCart;