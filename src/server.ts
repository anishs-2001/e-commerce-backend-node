import express, { Request, Response, NextFunction } from 'express';
import supplierRouter from './router/supplierRoutes.ts';
import login from './router/indexRoutes.ts';
import customerRouter from './router/customerRoutes.ts';
import firstExampleMW, { secondExampleMW } from './middleware/middlewareExample.ts';
import sequelizeSync from './services/sequelize.ts';
import { connectToMongoDb, stopMongoDb } from './services/mongodb.ts';
import sequelize from './config/sequelize-config.ts';
import cors from 'cors';
import { Server, Socket } from 'socket.io';
import http from 'http';
import initializeSocket from './services/socket.ts';
import associate from './models/association.ts';

const app = express();
const server = http.createServer(app);
const io = initializeSocket(server);

const port = 3000;

io.on('connection', (socket: Socket) => {
    console.log('a user connected');

    socket.emit('event emitted', 'hello from back end');

    socket.on('button clicked', (res) => {
        console.log(res);
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
associate();
sequelizeSync();
connectToMongoDb();

const corsOption = {
    // Accept: 'application/json, text/html',
    origin: 'http://localhost:8080',
    // methods: 'GET, POST, PUT, PATCH',
}

app.use(cors());
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

server.listen('3001', () => {
    console.log('Socket listening to 3001');
})

//instance of a node running on a machine(process)
process.on("SIGINT", () => {
    sequelize.close(); stopMongoDb;
    process.exit();
});

process.on("exit", () => {
    sequelize.close(); stopMongoDb;
});

export default io;
