import EcCustomers from "../../models/ec_customers";
import { Request, Response } from "express";

const customerProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const { e_mail } = req.body;
        const profile = await EcCustomers.findOne({ where: { e_mail }, raw: true });
        res.status(200).json({
            message: `user name: ${profile?.full_name},  email: ${profile?.e_mail},  registration id: ${profile?.registration_id},  registration time: ${profile?.registration_time_stamp}`
        });
    }
    catch (error) {
        res.status(500).json({ error: ` Internal server error` });
    }
};

export default customerProfile;