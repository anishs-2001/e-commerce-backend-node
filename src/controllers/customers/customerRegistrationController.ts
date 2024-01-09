import { Request, Response } from 'express';
import EcCustomers from "../../models/ec_customers";

const customerRegistration = async (req: Request, res: Response): Promise<void> => {
    try {
        const { full_name, e_mail, password, profile_pic } = req.body;
        const user = await EcCustomers.create({
            full_name,
            e_mail,
            password,
            profile_pic: Buffer.from(profile_pic),
        }, { raw: true })
        res.status(200).json({ message: `registration_id: ${user.registration_id}` })
    }
    catch (error: any) {
        console.log(error);
        res.status(401).json({ error: error.toString() });
    }
};

export default customerRegistration;
