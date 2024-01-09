import EcSuppliers from "../../models/ec_suppliers";
import { Request, Response } from 'express';

const supplierProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const { e_mail } = req.body;
        const profile = await EcSuppliers.findOne({ where: { e_mail }, raw: true });
        res.status(200).json({ message: `user_name: ${profile?.full_name}, email: ${profile?.e_mail}` });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default supplierProfile;