import express, { Router } from 'express';
import { Request, Response } from 'express';
import supplierProfile from '../controllers/suppliers/supplierProfile';
import supplierRegistration from '../controllers/suppliers/supplierRegistrationController';
import resetPassword from '../controllers/authentication/resetPassword';
import verifyToken from '../middleware/verifyToken';
import addProduct from '../controllers/products/addProducts';
import editProduct from '../controllers/products/editProducts';
import getProductSupplier from '../controllers/products/getProductsSupplier';
import multer from 'multer';

const router: Router = express.Router();
const storage = multer.memoryStorage(); //using multer storage engine
const upload = multer({ storage: storage })

router.post("/supplierRegistration", upload.single('profile_pic'), async (req: Request, res: Response) => {
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
