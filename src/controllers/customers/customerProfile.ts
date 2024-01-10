import EcCustomers from "../../models/ec_customers";
import { Request, Response } from "express";

const customerProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const { registrationId } = req.body.jwt_decoded;
        if (!registrationId) {
            res.status(403).json({ message: 'Forbidden' });
        }
        const profile = await EcCustomers.findOne({ where: { registration_id: registrationId }, raw: true });
        res.status(200).json({ ...profile });
    }
    catch (error) {
        res.status(500).json({ error: ` Internal server error` });
    }
};

export default customerProfile;