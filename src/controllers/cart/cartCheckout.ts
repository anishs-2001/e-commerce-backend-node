import { Request,Response } from 'express'
import { Db, ObjectId } from 'mongodb';
import { client } from "../../services/mongodb.ts";
import Stripe from 'stripe'
import EcCart from '../../models/ec_cart.ts';
import EcCustomers from '../../models/ec_customers.ts';

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
        const amounts : number[] = [];
        const CartDetails = await Promise.all(cartData.map(async (data) => {
            const product = await productCollection.findOne({ _id: new ObjectId(data.product_id) });
            if (product) {
                const subTotal = data.quantity * product.product_price;
                amounts.push(subTotal)
                return {
                    product_name: product.product_name,
                    quantity: data.quantity,
                    product_price: product.product_price,
                    total: subTotal,
                }
            }
        }));
        console.log({...CartDetails})
        
        const totalAmount = amounts.reduce((acc, price) => acc + (price || 0), 0);

        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount,
            currency: 'inr',
            payment_method: 'pm_card_visa',
            confirm: true,
            return_url: 'http://127.0.0.1:5500/index.html',
        });
        res.status(200).json({ ...CartDetails, payment_id: paymentIntent.id, bill_amount: totalAmount });
    }
    catch(error: any) {
        res.status(500).json({error: error.toString()});
    }
};

export default cartCheckout;