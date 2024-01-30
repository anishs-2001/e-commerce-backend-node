import { Request, Response } from "express";
import { Db, ObjectId } from "mongodb";
import { client } from "../../services/mongodb";
import EcCart from "../../models/ec_cart";
import EcCustomers from "../../models/ec_customers";
import Stripe from "stripe";

let db: Db = client.db("e_commerce");

const stripe = new Stripe(
  "sk_test_51ORUlBSHq5EqE6NlIIjtrUNg8XYq8VrbZuIYgHEInSPs2qbOiZv1fhWLbLiUX6ykWfuY2Y3KWlVbhtUACEYRk3oO003KVzBoKC",
  {
    apiVersion: "2023-10-16",
  }
);

const cartcheckout1 = async (
  req: Request,
  res: Response
): Promise<void | any> => {
  try {
    const { registrationId } = req.body.jwt_decoded;

    const cartData = await EcCart.findAll({
      attributes: ["product_id", "quantity"],
      where: { registration_id: registrationId },
      raw: true,
    });
    const productId = cartData.map((items) => items.product_id);

    const productCollection = db.collection("products");
    const productData = await productCollection
      .find({ _id: { $in: productId.map((id) => new ObjectId(id as string)) } })
      .project({ product_price: 1 })
      .toArray();

    const productPrices = productData.map((price) => price.product_price);
    const productQuantity = cartData.map((qty) => qty.quantity);

    const totalAmount = productPrices.reduce((acc, price, index) => {
      return acc + price * productQuantity[index];
    }, 0);
    console.log(totalAmount);

    const leftJoin = async () => {
      const leftJoinRes = await EcCustomers.findAll({
        attributes: ["full_name", "e_mail"],
        include: [
          {
            model: EcCart,
            required: true,
            where: { registration_id: registrationId },
          },
        ],
        raw: true,
      });
      console.log("Inner Join", leftJoinRes);
      return leftJoinRes;
    };
    leftJoin();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: "inr",
      payment_method: "pm_card_visa",
      confirm: true,
      return_url: "https://yourwebsite.com/success",
    });
    return res.status(200).json({ paymentid: paymentIntent.id });
  } catch (error: any) {
    return res.status(500).json({ error: error.toString() });
  }
};

export default cartcheckout1;
