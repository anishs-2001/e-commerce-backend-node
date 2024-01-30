import express, { Router } from 'express';
import { Request, Response } from 'express';
import custometrRegistration from '../controllers/customers/customerRegistrationController';
import resetPassword from '../controllers/authentication/resetPassword';
import verifyToken from '../middleware/verifyToken';
import customerProfile from '../controllers/customers/customerProfile';
import getProduct from '../controllers/products/getProducts';
import addCart from '../controllers/cart/addCart';
import getCart from '../controllers/cart/getCart';
import updateCart from '../controllers/cart/updateCart';
import getUniqueProduct from '../controllers/products/getUniqueProducts';
import cartCheckout from '../controllers/cart/cartCheckout';
import cartcheckout1 from '../controllers/cart/cartcheckout1';
import exportCSV from '../controllers/cart/exportCsv';

const router: Router = express.Router();

router.post("/customerRegistration", async (req: Request, res: Response) => {
    custometrRegistration(req, res);
});


router.get("/customerProfile", verifyToken, async (req: Request, res: Response) => {
    customerProfile(req, res);
});


router.patch("/resetPassword", verifyToken, async (req: Request, res: Response) => {
    resetPassword(req, res);
});

router.get("/getProduct", verifyToken, (req: Request, res: Response) => {
    getProduct(req, res);
});

router.get("/getUniqueProduct/:_id", verifyToken, (req: Request, res: Response) => {
    getUniqueProduct(req, res);
});

router.post("/addCart", verifyToken, (req: Request, res: Response) => {
    addCart(req, res);
});

router.get("/getCart", verifyToken, (req: Request, res: Response) => {
    getCart(req, res);
});

router.put("/updateCart", verifyToken, (req: Request, res: Response) => {
    updateCart(req, res);
});

router.post("/cartCheckout", verifyToken, (req: Request, res: Response) => {
    cartCheckout(req, res);
});

router.post("/cartCheckoutCopy", verifyToken, (req: Request, res: Response) => {
    cartcheckout1(req, res);
});

router.get("/exportBill", verifyToken, (req: Request, res: Response) => {
    exportCSV(req, res);
});


export default router;
