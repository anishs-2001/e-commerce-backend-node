import { Request, Response } from 'express';
import EcCart from '../../models/ec_cart';

const updateCart = async (req: Request, res: Response): Promise<void | object> => {
    try {
        const products = req.body as { _id: string, quantity: number }[];  //Destructured into array
        const { registrationId, client_type } = req.body.jwt_decoded;

        if (!products || !Array.isArray(products)) {
            return res.status(404).json({ error: 'Bad request' });
        }

        const updateData = [];
        for (const product of products) {
            if (!product._id || !product.quantity || client_type != 'customer') {
                return res.status(404).json({ error: 'Product not found' });
            }
            const data = await EcCart.update({ quantity: product.quantity }, { where: { product_id: product._id, registration_id: registrationId } });
            updateData.push(data);
            res.status(200).json({ message: 'Data updated successfully', ...data });
        }
    }
    catch (error: any) {
        res.status(500).json({ error: error.toString() });
    }
};

export default updateCart;