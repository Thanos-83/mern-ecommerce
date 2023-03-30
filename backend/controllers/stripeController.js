import Stripe from 'stripe';
import asyncHandler from 'express-async-handler';
import { buffer } from 'micro';
// import Buffer from 'buffer';
import getRowBody from 'raw-body';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
console.log('iam here 5');

const endpointSecret = process.env.WEBHOOK_SIGNING_SECRET;
console.log('iam here 6');

export const createStripeSession = asyncHandler(async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const { items, email, userId, shippingAddress } = req.body;
  console.log('cart items: ', items);
  // console.log(stripe);
  // console.log(process.env.STRIPE_SECRET_KEY);
  let transformedItems = [];
  console.log('shipping address: ', shippingAddress);
  console.log('shipping address typeof: ', typeof shippingAddress);
  items.forEach((item) => {
    transformedItems.push({
      quantity: item.qty,
      price_data: {
        currency: 'eur',
        unit_amount: item.price * 100,
        product_data: {
          name: item.name,
          images: [item.image.secureUrl],
        },
      },
    });
  });
  console.log('transformed items: ', transformedItems);
  // const session = await
  stripe.checkout.sessions
    .create({
      payment_method_types: ['card'],
      shipping_address_collection: {
        allowed_countries: ['GB', 'GR'],
      },
      line_items: transformedItems,
      mode: 'payment',
      success_url: `${process.env.APP_URL}/success`,
      cancel_url: `${process.env.APP_URL}/cancel`,
      metadata: {
        email,
        images: JSON.stringify(items.map((item) => item.image.secureUrl)),
        names: JSON.stringify(items.map((item) => item.name)),
        // qtys: JSON.stringify(items.map((item) => item.qty)),
        // prices: JSON.stringify(items.map((item) => item.price)),
        reducedOrderItems: JSON.stringify(
          items.map((item) => ({
            price: item.price,
            qty: item.qty,
          }))
        ),
        userId,
        shippingAddress: JSON.stringify(shippingAddress),
      },
    })
    .then((result) => {
      console.log('server strapi response: ', result);
      res.status(200).json({ id: result.id, stripeData: result });
    })
    .catch((error) => console.log('Stripe session Error: ', error));
  // console.log('stripe session: ', session);
  res.status(200);
  // .json({ id: session.id });
});

export const getStripeSessions = asyncHandler(async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const sessions = await stripe.checkout.sessions.list({
      limit: 10,
    });
    console.log(sessions);
    res.status(200).json({ 'stripe sessions': sessions });
  } catch (error) {
    console.log('error getting sessions: ', error);
    res.status(404).json({ 'error getting sessions': error });
  }
});
