import Stripe from 'stripe';
import asyncHandler from 'express-async-handler';

export const createStripeSession = asyncHandler(async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const { items, email } = req.body;
  // console.log(items, email);
  // console.log(stripe);
  // console.log(process.env.STRIPE_SECRET_KEY);
  let transformedItems = [];

  items.forEach((item) => {
    transformedItems.push({
      quantity: item.qty,
      price_data: {
        currency: 'eur',
        unit_amount: item.price * 100,
        product_data: {
          name: item.name,
          // images: [`${process.env.APP_URL}/${item.image}`],
          images: [],
        },
      },
    });
  });
  // console.log('transformed items: ', transformedItems);
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
        // images: JSON.stringify(items.map((item) => item.image)),
      },
    })
    .then((result) => res.status(200).json({ id: result.id }))
    .catch((error) => console.log('Stripe session Error: ', error));
  // console.log('stripe session: ', session);
  res.status(200);
  // .json({ id: session.id });
});
