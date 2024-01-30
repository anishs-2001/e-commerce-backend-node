import { Db } from "mongodb";
import { client } from "../../services/mongodb";
import { Request, Response } from 'express';
import searchQueryType from "../../../types/productTypes/index";

let db: Db = client.db('e_commerce');

const getProductSupplier = async (req: Request, res: Response): Promise<void> => {
    try {
        const { registrationId } = req.body.jwt_decoded;
        const { offset, sortBy, sortOrder, search } = req.query;
        if (!registrationId) {
            res.status(422).json({ error: 'Bad request' });
        }

        let searchQuery: searchQueryType = { supplier_registration_id: registrationId };
        if (search) {
            const regex = new RegExp(search as string, 'i');
            const collectionKeys: string[] = ['product_name', 'product_category'];
            searchQuery.$or = collectionKeys.map(key => ({ [key]: { $regex: regex } }));
        }

        let skip: number = 0;
        let sorting = {};

        if (offset) {
            skip = parseInt(offset as string);
        }

        if (sortBy && sortOrder) {
            sorting = { [sortBy as string]: parseInt(sortOrder as string) }
        }

        const productCollection = db.collection('products');
        const data = await productCollection.find(searchQuery, {
            projection: {
                product_name: 1,
                product_category: 1,
                product_price: 1,
                product_stock: 1,
                product_photo: 1,
                _id: 1
            }
        }).skip(skip).limit(10).sort(sorting).toArray();
        res.status(200).json({ ...data });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default getProductSupplier;