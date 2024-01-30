import { Request,Response } from 'express'
import { Db, ObjectId } from 'mongodb';
import { client } from "../../services/mongodb.ts";
import Stripe from 'stripe'
import EcCart from '../../models/ec_cart.ts';
import EcCustomers from '../../models/ec_customers.ts';
import AWS from 'aws-sdk';
import path from 'path';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import fs from 'fs';

let db: Db = client.db('e_commerce');

const stripe = new Stripe('sk_test_51ORUlBSHq5EqE6NlIIjtrUNg8XYq8VrbZuIYgHEInSPs2qbOiZv1fhWLbLiUX6ykWfuY2Y3KWlVbhtUACEYRk3oO003KVzBoKC', {
    apiVersion: '2023-10-16',
});

const cartCheckout = async (req: Request, res: Response) :Promise<any>=>{
    try{
        const{ registrationId } = req.body.jwt_decoded;

        const cartData =  await EcCart.findAll({ where: { registration_id : registrationId}, include: [{ model: EcCustomers, required: true,},], raw: true,});
        console.log(cartData);

        const productCollection = db.collection('products');
        
        if(cartData) {
            const csvHeaders = "Item, Price, Quantity, Total Price";
            let csvData = '';
            
            const subTotal = await Promise.all(cartData.map(async (data) => {
                const product = await productCollection.findOne({ _id: new ObjectId(data.product_id) });
                csvData += `${ product?.product_name }, ${ product?.product_price }, ${ data.quantity }, ${ product?.product_price * data.quantity }\n`;
                return product?.product_price * data.quantity;
            }));
    
            const completeCsv = `${csvHeaders}\n${csvData}`;
            const filePath = "bills/bill.csv";

            const totalAmount = subTotal.reduce((acc, price) => acc + (price || 0), 0);

            const paymentIntent = await stripe.paymentIntents.create({
                amount: totalAmount,
                currency: 'inr',
                payment_method: 'pm_card_visa',
                confirm: true,
                return_url: 'http://127.0.0.1:5500/index.html',
            });

            fs.writeFile(filePath, completeCsv, (err) => {
                if (err) {
                    console.error("Error writing CSV file:", err);
                } 
                else {
                    console.log(`CSV file created successfully.`);
                }
            });

            const accessKeyId = 'AKIA5IOGN2NXNVX6UNHV';
            const secretAccessKey = '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';
        
            const s3= new AWS.S3({
                accessKeyId: accessKeyId,
                secretAccessKey: secretAccessKey,
            });
            
            const params : AWS.S3.PutObjectRequest={
                Bucket: "ecommercebucket1",
                Key: path.join('invoice', `bill_${paymentIntent.id}`),
                Body: fs.createReadStream(filePath),
                ContentType: 'text/csv',
            }

            const s3UploadAsync = (s3:AWS.S3,params: AWS.S3.PutObjectRequest): Promise<ManagedUpload.SendData> => {
                return new Promise((resolve, reject) => {
                  s3.upload(params, (err: Error, data: ManagedUpload.SendData) => {
                    if (err) {
                      reject(err);
                    } else {
                      resolve(data);
                    }
                  });
                });
            };
            const bill_url = await s3UploadAsync(s3, params);
            res.status(200).json({ payment_id: paymentIntent.id, bill_amount: totalAmount,  bill: bill_url.Location });
        }
    }
    catch(error: any) {
        res.status(500).json({error: error.toString()});
    }
};

export default cartCheckout;