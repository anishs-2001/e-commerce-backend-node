import express, { Request, Response, NextFunction } from 'express';
import supplierRouter from './router/supplierRoutes.ts';
import login from './router/indexRoutes.ts';
import customerRouter from './router/customerRoutes.ts';
import firstExampleMW, { secondExampleMW } from './middleware/middlewareExample.ts';
import sequelizeSync from './services/sequelize.ts';
import { stopMongoDb } from './services/mongodb.ts';
import sequelize from './config/sequelize-config.ts';

const app = express();
const port = 3000;

sequelizeSync();


//Add this line before app.use to encode white spaces in the queryparam
app.use(express.urlencoded({ extended: true }));

//middlewire to convert body into json
app.use(express.json());

interface CustomRequest extends Request {
    customProperty?: object;
};

app.get("/example", firstExampleMW, secondExampleMW, (req: CustomRequest, res: Response) => {
    console.log("Route Handler-Handling Request");
    const customProperty = req.customProperty ?? 'Not-available';
    res.send(`Response with modified request property: ${JSON.stringify(customProperty)}`);
});

app.use("/api/v1", supplierRouter);
app.use("/api/v2", customerRouter);
app.use(login);

app.listen(port, () => {
    console.log(`Listening to Port ${port}...`);
});

process.on("SIGINT", () => {
    sequelize.close(); stopMongoDb;
});

process.on("exit", () => {
    sequelize.close(); stopMongoDb;
});