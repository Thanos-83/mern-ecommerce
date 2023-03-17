import express from 'express';

const router = express.Router();

import { createStripeSession } from '../controllers/stripeController.js';

router.post('/', createStripeSession);

export default router;
