import Stripe from 'stripe';
import asyncHandler from 'express-async-handler';
import { buffer } from 'micro';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
// import getRowBody from 'raw-body';

// async function buffer(readable) {
//   const chunks = [];
//   for await (const chunk of readable) {
//     chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
//   }
//   return Buffer.concat(chunks);
// }

export const stripeWebhook = asyncHandler(async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  console.log('iam here 5');

  const endpointSecret = process.env.WEBHOOK_SIGNING_SECRET;

  let event;
  try {
    const sig = req.headers['stripe-signature'];
    console.log('iam here 6');

    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();

    // const requestBuffer = Buffer.from(JSON.stringify(req));

    // console.log('type of req.body: ', typeof req.body);
    // console.log('type of req: ', typeof req);

    // const requestBuffer = await getRowBody(req);
    console.log('iam here 7');

    event = stripe.webhooks.constructEvent(
      // req.body,
      payload,
      // Buffer.from(JSON.parse(req.body)),
      sig,
      endpointSecret
    );
    console.log('iam here 2');
  } catch (err) {
    console.log('iam here 3');

    console.log('webhook error: ', err);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log('Event Type here: ', event);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log('metadata: ', session.metadata);
    try {
      const names = JSON.parse(session.metadata.names);
      const images = JSON.parse(session.metadata.images);
      const items = JSON.parse(session.metadata.reducedOrderItems);
      const order = {
        totalPrice: session.amount_total / 100,
        orderItems: items.map((item, index) => ({
          ...item,
          name: names[index],
          image: images[index],
        })),
        shippingAddress: JSON.parse(session.metadata.shippingAddress),
        paymentMethod: 'cart',
        stripeId: session.id,
        isPaid: session.payment_status === 'paid' && true,
        paidAt: session.created,
        user: session.metadata.userId,
      };

      const newOrder = new Order(order);
      const createdOrder = await newOrder.save();
      const user = await User.findById(session.metadata.userId);
      user.orders.push(createdOrder._id);
      user.save();

      console.log('created order from webhook: ', createdOrder);
      // Return a response to acknowledge receipt of the event
      res.status(200).json({ msg: 'stripe webhook ok', createdOrder });
    } catch (error) {
      console.log('webhook error: ', error);
      res.status(400).json({ 'webhook error': error });
    }
  }
});
