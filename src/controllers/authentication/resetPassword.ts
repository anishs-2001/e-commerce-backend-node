import { Request, Response } from 'express';
import EcCustomers from '../../models/ec_customers';
import EcSuppliers from '../../models/ec_suppliers';
import bcrypt from 'bcrypt';

const resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const { e_mail, new_password } = req.body;
        const { client_type } = req.body.jwt_decoded;

        if (client_type === "customer") {
            const hashedPassword = bcrypt.hashSync(new_password, bcrypt.genSaltSync(10));
            await EcCustomers.update({ password: hashedPassword }, { where: { e_mail }, });
        }
        else if (client_type === "supplier") {
            const hashedPassword = bcrypt.hashSync(new_password, bcrypt.genSaltSync(10));
            await EcSuppliers.update({ password: hashedPassword }, { where: { e_mail }, });
        }
        res.status(200).json({ message: "Password updated successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default resetPassword;