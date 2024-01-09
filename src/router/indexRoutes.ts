import express, { Router } from 'express';
import { Request, Response } from 'express';
import login from '../controllers/authentication/login';

const router: Router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
    login(req, res);
});

export default router;