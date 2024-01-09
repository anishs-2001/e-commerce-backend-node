import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const secretKey = 'your-secret-key';
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: "Unauthorized - Token not provided" });
    }

    try {
        const processedToken = authorization?.split('Bearer ')[1];
        //verify the token
        const decoded = jwt.verify(processedToken, secretKey);
        console.log(decoded);

        //Attach the decoded payload to request object
        //nammal create cheytha custom prroperty
        req.body.jwt_decoded = decoded;

        console.log("\n\n\n\n\n\n\n\\n\n");
        console.log(req.body.jwt_decoded);
        console.log("\n\n\n\n\n\n\n\\n\n");
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }

};

export default verifyToken;