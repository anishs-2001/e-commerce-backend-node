import { Request, Response } from 'express';
import EcCustomers from '../../models/ec_customers';
import EcSuppliers from '../../models/ec_suppliers';

const resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const { e_mail, new_password } = req.body;
        console.log(req.body.jwt_decoded);
        const { client_type } = req.body.jwt_decoded;

        if (client_type === "customer") {
            await EcCustomers.update({ password: new_password }, { where: { e_mail }, });

            res.status(200).json({ message: "Password updated successfully" });
        }
        else if (client_type === "supplier") {
            await EcSuppliers.update({ password: new_password }, { where: { e_mail }, });

            res.status(200).json({ message: "Password updated successfully" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default resetPassword;