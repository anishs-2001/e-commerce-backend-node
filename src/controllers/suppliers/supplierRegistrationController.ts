import EcSuppliers from "../../models/ec_suppliers";
import { Request, Response } from 'express';

const supplierRegistration = async (req: Request, res: Response): Promise<void> => {
    try {
        const { full_name, e_mail, password, profile_pic } = req.body;

        await EcSuppliers.create({ full_name, e_mail, password, profile_pic: Buffer.from(profile_pic), }, { raw: true });

        res.status(200).json({ message: "Successfully inserted data in the table." })
    }
    catch (error: any) {
        console.log(error);
        res.status(500).json({ error: error.toString() });//internal server error
    }
};

export default supplierRegistration;