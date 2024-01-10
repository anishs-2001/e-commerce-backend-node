import { MongoClient, ServerApiVersion, Db } from 'mongodb';
import config from "../config/mongodb-config.ts";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

const environment = process.env.NODE_ENV || "development"

export const client = new MongoClient(config[environment].mongoURI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
},);

const connectToMongoDb = async (): Promise<void> => {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();

        // Access a database, assuming you have one
        const db: Db = client.db("e-commerce");

        // Send a ping to confirm a successful connection
        await db.command({ ping: 1 });

        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }

    catch (err) {
        console.log("mongodb error is ", err);
    }
}

const stopMongoDb = async (): Promise<void> => {
    try {
        await client.close();
    }
    catch (err) {
        console.log("mongodb close err is ", err);
    }
}

export { connectToMongoDb, stopMongoDb };
