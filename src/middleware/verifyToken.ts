import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const secretKey = 'your-secret-key';
    const { authorization } = req.headers;

    if (!authorization) {
        res.status(403).json({ message: "Unauthorized - Token not provided" });
        return;
    }

    try {
        const processedToken = authorization?.split('Bearer ')[1];
        // Verify the token
        const decoded = processedToken && jwt.verify(processedToken, secretKey);

        // Attach the decoded payload to the request object
        //nammal create cheytha custom prroperty
        req.body.jwt_decoded = decoded;

        if ((req.baseUrl).includes("/api/v1")) {
            if (req.body.jwt_decoded?.client_type === "supplier") {
                next();
            } else {
                res.status(403).json({ message: "Unauthorized - Invalid client type for API version" });
            }
        }
        else if ((req.baseUrl).includes("/api/v2")) {
            if (req.body.jwt_decoded?.client_type === "customer") {
                next();
            } else {
                res.status(403).json({ message: "Unauthorized - Invalid client type for API version" });
            }
        }
        else {
            res.status(403).json({ message: "Unauthorized - Invalid API version" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default verifyToken;
