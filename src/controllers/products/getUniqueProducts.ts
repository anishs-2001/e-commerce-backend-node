import { client } from "../../services/mongodb";
import { Db, ObjectId } from 'mongodb';
import { Request, Response } from "express";

let db: Db = client.db('e_commerce');

const getUniqueProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        let { _id } = req.params;
        const { client_type } = req.body.jwt_decoded;
        if (!_id || client_type != 'customer') {
            res.status(404).json({ error: 'Bad request' });
        }
        _id = _id.replace(':', '');
        const productCollection = db.collection('products');
        const filter = { _id: new ObjectId(_id as string) };
        const data = await productCollection.find(filter).toArray();
        res.status(200).json({ ...data });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export default getUniqueProduct;