import express, { Router } from 'express';
import { Request, Response } from 'express';
import supplierProfile from '../controllers/suppliers/supplierProfile';
import supplierRegistration from '../controllers/suppliers/supplierRegistrationController';
import resetPassword from '../controllers/authentication/resetPassword';
import verifyToken from '../middleware/verifyToken';

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

export default router;
