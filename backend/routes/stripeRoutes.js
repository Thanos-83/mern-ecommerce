import express from 'express';
import bodyParser from 'body-parser';
import getRawBody from 'raw-body';
const router = express.Router();

import {
  createStripeSession,
  getStripeSessions,
} from '../controllers/stripeController.js';

router.post('/', createStripeSession);
router.get('/', getStripeSessions);

export default router;
