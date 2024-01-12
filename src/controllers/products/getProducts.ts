import { client } from "../../services/mongodb";
import { Db, ObjectId } from 'mongodb';
import { Request, Response } from "express";

let db: Db = client.db('e_commerce');

const getProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { _id } = req.query;
        const { client_type } = req.body.jwt_decoded;
        if (!_id) {
            res.status(404).json({ error: "Bad request" });
        }
        const productCollection = db.collection('products');
        const data = await productCollection.find({ _id: new ObjectId(_id as string) }).toArray();
        res.status(200).json({ ...data });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export default getProduct;