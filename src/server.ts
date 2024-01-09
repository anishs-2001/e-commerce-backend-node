import express, { Request, Response, NextFunction } from 'express';
import sequelize from '../src/config/sequelize-config.ts';
import supplierRouter from './router/supplierRoutes.ts';
import login from './router/indexRoutes.ts';
import customerRouter from './router/customerRoutes.ts';
import firstExampleMW, { secondExampleMW } from './middleware/middlewareExample.ts';

const app = express();
const port = 3000;

//Syncing the models in node and schema in DB
sequelize.sync({ force: false })
    .then(() => {
        console.log('Database synced.');
    })
    .catch((error) => {
        console.error("Error syncing database:", error);
    });

//Add this line before app.use to encode white spaces in the queryparam
app.use(express.urlencoded({ extended: true }));

//middlewire to convert body into json
app.use(express.json());

// app.use((req, res, next) => {
//     console.log("Hi from middleware");
//     next();
// });

interface CustomRequest extends Request {
    customProperty?: object;
};

// app.use((req: CustomRequest, res: Response, next: NextFunction) => {
//     firstExampleMW(req, res, next);
// });

// app.use((req, res, next) => {
//     secondExampleMW(req, res, next);
// });

app.get("/example", firstExampleMW, secondExampleMW, (req: CustomRequest, res: Response) => {
    console.log("Route Handler-Handling Request");
    const customProperty = req.customProperty ?? 'Not-available';
    res.send(`Response with modified request property: ${JSON.stringify(customProperty)}`);
});

// app.get("/", (req: Request, res: Response) => {
//     const { name, age } = req.query; //localhost:3000/?name=anish&age=22
//     res.send(`${name},${age}`);
// })

// app.post("/contact", (req: Request, res: Response) => {
//     const { name, phone, email } = req.body;

//     if (!name) {
//         res.status(422).json({ message: "name missing" }); //422 client invalid data
//     }
//     res.status(200).json({ message: `contact details received for ${name} are ${phone} and ${email}` });
// })

app.use("/api/v1", supplierRouter);
app.use("/api/v2", customerRouter);
app.use(login);

app.listen(port, () => {
    console.log(`Listening to Port ${port}...`);
})