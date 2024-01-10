import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const secretKey = 'your-secret-key';
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(403).json({ message: "Unauthorized - Token not provided" });
    }
    try {
        const processedToken = authorization?.split('Bearer ')[1];
        //verify the token
        const decoded = processedToken && jwt.verify(processedToken, secretKey);

        //Attach the decoded payload to request object
        //nammal create cheytha custom prroperty
        req.body.jwt_decoded = decoded;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default verifyToken;