import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
    customProperty?: object;
};

const firstExampleMW = (req: CustomRequest, res: Response, next: NextFunction) => {
    req.customProperty = { message: 'hello' };
    //req["customProperty"] = { message: 'hello' }; - same effect
    next();
};

const secondExampleMW = (req: CustomRequest, res: Response, next: NextFunction) => {
    res.setHeader('Content-type', 'application/json');
    res.setHeader('Set-cookie', ['type=ninja', 'language=javascript']);
    next();
}

export default firstExampleMW;
export { secondExampleMW };