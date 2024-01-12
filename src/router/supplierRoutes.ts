import express, { Router } from 'express';
import { Request, Response } from 'express';
import supplierProfile from '../controllers/suppliers/supplierProfile';
import supplierRegistration from '../controllers/suppliers/supplierRegistrationController';
import resetPassword from '../controllers/authentication/resetPassword';
import verifyToken from '../middleware/verifyToken';
import addProduct from '../controllers/products/addProducts';
import editProduct from '../controllers/products/editProducts';
import getProductSupplier from '../controllers/products/getProductsSupplier';

const router: Router = express.Router();

router.post("/supplierRegistration", async (req: Request, res: Response) => {
    supplierRegistration(req, res);
});

router.get("/supplierProfile", verifyToken, async (req: Request, res: Response) => {
    supplierProfile(req, res);
});

router.patch("/resetPassword", verifyToken, async (req: Request, res: Response) => {
    resetPassword(req, res);
});

router.post("/addProduct", verifyToken, (req: Request, res: Response) => {
    addProduct(req, res);
});

router.patch("/editProduct", verifyToken, (req: Request, res: Response) => {
    editProduct(req, res);
});

router.get("/getProductSupplier", verifyToken, (req: Request, res: Response) => {
    getProductSupplier(req, res);
});


export default router;
