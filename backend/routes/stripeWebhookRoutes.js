import express from 'express';
import bodyParser from 'body-parser';
// import getRawBody from 'raw-body';
const router = express.Router();

import { stripeWebhook } from '../controllers/stripeWebhook.js';

router.post('/', bodyParser.raw({ type: 'application/json' }), stripeWebhook);
// router.post('/', express.raw({ type: '*/*' }), stripeWebhook);

export default router;
