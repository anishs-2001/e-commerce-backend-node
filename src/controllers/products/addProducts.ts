import { Db } from "mongodb";
import { client } from "../../services/mongodb";
import { Request, Response } from "express";

let db: Db = client.db('e_commerce');

const addProduct = async (req: Request, res: Response): Promise<void> => {
    const { product_name, product_category, product_stock, product_photo, ...other } = req.body;
    const { registrationId } = req.body.jwt_decoded;
    try {
        if (!product_name || !product_category || !product_stock || !product_photo) {
            res.status(404).json({ error: "Bad request" });
        }
        const productCollection = db.collection('products');
        const productData = {
            supplier_registration_id: registrationId,
            product_name,
            product_category,
            product_stock,
            product_photo: Buffer.from(product_photo, 'base64'),
            ...other
        };

        delete productData.jwt_decoded;
        await productCollection.insertOne(productData);
        res.status(200).json({ message: "Insertion succesful" })
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
export default addProduct;
