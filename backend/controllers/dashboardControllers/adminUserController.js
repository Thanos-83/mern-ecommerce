import User from '../../models/userModel.js';
import asyncHandler from 'express-async-handler';
// import generateToken from '../utils/generateJWT.js';
// import bcrypt from 'bcryptjs';

// @desc    GET all users
// @route   GET  /api/dashboard/users
// @access  Private Admin
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).populate('orders');
  // console.log(users);
  if (users) {
    res.status(200).json({
      users,
    });
  } else {
    res.status(404);
    throw new Error('User Not Found');
  }
});

// @desc    GET single admin user
// @route   GET  /api/dashboard/users/:userID
// @access  Private Admin
export const getSingleUser = asyncHandler(async (req, res) => {
  // console.log(req.params.userID);
  const user = await User.findById(req.params.userID).populate(
    'orders',
    '-password',
    null,
    { sort: { createdAt: -1 } }
  );
  // .sort({ orders: 'asc' })
  // .select('-password');

  if (user) {
    res.status(200).json({
      user,
    });
  } else {
    res.status(404);
    throw new Error('User Not Found');
  }
});
