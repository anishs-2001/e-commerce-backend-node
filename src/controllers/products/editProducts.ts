import { Db, ObjectId } from "mongodb";
import { client } from "../../services/mongodb";
import { Request, Response } from 'express';

let db: Db = client.db('e_commerce');

const editProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { product_id } = req.body;
        const { client_type } = req.body.jwt_decoded;
        if (!product_id || client_type != 'supplier') {
            res.status(404).json({ error: 'Bad request' });
        }
        const productCollection = db.collection('products');
        const updatedProductData = {
            ...req.body
        };
        delete updatedProductData.jwt_decoded;
        delete updatedProductData.product_id;
        const filter = { _id: new ObjectId(product_id as string) };
        console.log(updatedProductData)
        const updatedData = await productCollection.updateOne(filter, { $set: updatedProductData });

        if (updatedData.modifiedCount > 0) {
            res.status(200).json({ message: "Update successful" });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: 'Updated successfully' })
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default editProduct;
