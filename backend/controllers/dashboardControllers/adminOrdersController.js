import Order from '../../models/orderModel.js';
import asyncHandler from 'express-async-handler';

// @desc    Get admin  orders
// @route   GET /api/orders/allorders
// @access  Admin Private

export const getAllOrders = asyncHandler(async (req, res) => {
  const allOrders = await Order.find({}).populate('user').select('-password');
  try {
    if (!allOrders) {
      res.status(400).json({ msg: 'No orders yet' });
    }

    console.log(allOrders);
    res.status(200).json({ orders: allOrders });
  } catch (error) {
    console.log('orders error: ', error);
    res.status(400).json({ msg: error });
  }
});
