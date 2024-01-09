import { Request, Response } from "express";
import EcSuppliers from "../../models/ec_suppliers";
import EcCustomers from "../../models/ec_customers";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const login = async (req: Request, res: Response): Promise<void> => {
    const { e_mail, password, client_type } = req.body;
    try {
        let user;
        if (client_type === "supplier") {
            user = await EcSuppliers.findOne({ where: { e_mail }, raw: true });
        }
        else if (client_type === "customer") {
            user = await EcCustomers.findOne({ where: { e_mail }, raw: true });
        }
        if (user?.password && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign(
                { registrationId: user?.registration_id, client_type },
                'your-secret-key', // Replace with your secret key
                { expiresIn: '24h' } // Token expiration time
            );
            res.status(200).json({ token });
        }
        else {
            res.status(401).json({ message: "Invalid credentials" })
        }
    }
    catch (error: any) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export default login;
