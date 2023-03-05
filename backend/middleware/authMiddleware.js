import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
const protectRoutes = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log('Token: ', token);
      const decodedID = await jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded ID: ', decodedID);
      req.user = await User.findById(decodedID.id).select('-password');
      next();
    } catch (error) {
      console.log('Auth error: ', error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export default protectRoutes;
