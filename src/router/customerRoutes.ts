import express, { Router } from 'express';
import { Request, Response } from 'express';
import custometrRegistration from '../controllers/customers/customerRegistrationController';
import resetPassword from '../controllers/authentication/resetPassword';
import verifyToken from '../middleware/verifyToken';
import customerProfile from '../controllers/customers/customerProfile';

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

export default router;
