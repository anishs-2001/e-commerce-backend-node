import { Db, ObjectId } from "mongodb";
import { client } from "../../services/mongodb";
import { Request, Response } from 'express';

let db: Db = client.db('e_commerce');

const editProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { _id } = req.body;
        const { client_type, registrationId } = req.body.jwt_decoded;
        if (!_id || client_type != 'supplier') {
            res.status(404).json({ error: 'Bad request' });
        }
        const productCollection = db.collection('products');
        const updatedProductData = {
            ...req.body
        };
        delete updatedProductData.jwt_decoded;
        delete updatedProductData._id;
        const filter = { _id: new ObjectId(_id as string), supplier_registration_id: registrationId };
        console.log(updatedProductData)
        const updatedData = await productCollection.updateOne(filter, { $set: updatedProductData });

        if (updatedData.modifiedCount > 0) {
            res.status(200).json({ message: "Updated successfully" });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default editProduct;
