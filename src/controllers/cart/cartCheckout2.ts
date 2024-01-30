import { Request, Response } from 'express';
import Stripe from 'stripe';
import EcCart from '../../models/ec_cart';
import EcCustomers from '../../models/ec_customers';
import { Db, ObjectId } from 'mongodb';
import { client } from '../../services/mongodb';

let db: Db = client.db('e_commerce');

const cartCheckout = async(req: Request, res: Response): Promise<void| object> =>{
    try{
        const stripe = new Stripe('sk_test_51ORUlBSHq5EqE6NlIIjtrUNg8XYq8VrbZuIYgHEInSPs2qbOiZv1fhWLbLiUX6ykWfuY2Y3KWlVbhtUACEYRk3oO003KVzBoKC', {
            apiVersion: '2023-10-16',
        }); 

        const { price, token } = req.body;
        const { registrationId } = req.body.jwt_decoded;

        const productCollection = db.collection('products');
        const cartData = await EcCart.findAll({ where: {registration_id: registrationId}, raw: true});
        
        const amounts = [];

        for (const data of cartData) {
            const productData = await productCollection.find({ _id: new ObjectId(data.product_id as string)}).toArray();
            const amount = productData[0].product_price * data.quantity;
            amounts.push(amount);
        };
        
        const totalAmount = amounts.reduce((acc, cv) => {
            return acc + cv;
          }, 0);
          
        console.log(totalAmount);

        const leftJoin = async () => {
            const leftJoinRes = await EcCustomers.findAll({
              attributes: ['full_name', 'e_mail'],
              include: [{ model: EcCart, required: true, where: { registration_id: registrationId } }],
              raw: true,
            });
            console.log("Inner Join", leftJoinRes);
            return leftJoinRes;
        }
        leftJoin();

        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount,
            currency: 'inr',
            payment_method: 'pm_card_visa',
            confirm: true,
            return_url: 'https://yourwebsite.com/success',
        });
        return res.status(200).json({ paymentid: paymentIntent.id});
    }
    catch(error: any){
        return res.status(500).json({error: error.toString()});
    }

};

export default cartCheckout;