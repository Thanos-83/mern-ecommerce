import Stripe from 'stripe';
import asyncHandler from 'express-async-handler';
import { buffer } from 'micro';
// import Buffer from 'buffer';
import getRowBody from 'raw-body';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
console.log('iam here 5');

const endpointSecret = process.env.WEBHOOK_SIGNING_SECRET;

export const stripeWebhook = asyncHandler(async (req, res) => {
  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  // console.log('iam here 5');

  // const endpointSecret = process.env.WEBHOOK_SIGNING_SECRET;
  // console.log('iam here 6');

  let event;
  try {
    const sig = req.headers['stripe-signature'];
    console.log('iam here 6');

    // const requestBuffer = await buffer(req);
    // const payload = requestBuffer.toString();

    // const requestBuffer = Buffer.from(JSON.stringify(req));

    console.log('type of req.body: ', typeof req.body);
    console.log('type of req: ', typeof req);

    // const requestBuffer = await getRowBody(req);
    console.log('iam here 7');

    event = stripe.webhooks.constructEvent(
      // req.body,
      // payload,
      Buffer.from(JSON.parse(req.body)),
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
  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('event session: ', session);
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('PaymentIntent was successful!');
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      console.log('PaymentMethod was attached to a Customer!');
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  res.json({ msg: 'stripe webhook ok' });
});
