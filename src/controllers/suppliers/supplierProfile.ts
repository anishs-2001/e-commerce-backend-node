import EcSuppliers from "../../models/ec_suppliers";
import { Request, Response } from 'express';

const supplierProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const { registrationId } = req.body.jwt_decoded;
        if (!registrationId) {
            res.status(403).json({ message: 'Forbidden' });
        }
        const profile = await EcSuppliers.findOne({ where: { registration_id: registrationId }, raw: true });
        res.status(200).json({ ...profile });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default supplierProfile;