import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateJWT.js';
import bcrypt from 'bcryptjs';

// --------------------------------------------------------
// @desc    Auth user and get token
// @route   POST  /api/users/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error('Invalid email');
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      throw new Error('Invalid password');
    }

    if (user && matchPassword) {
      const token = generateToken(user._id);
      res.status(200).json({
        email: user.email,
        _id: user._id,
        name: user.name,
        isAdmin: user.isAdmin,
        token: token,
      });
    }
  } catch (error) {
    res.status(401);
    res.json(error.message);
  }
});

// --------------------------------------------------------
// @desc    Register new user and get token
// @route   POST  /api/users
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      res.status(400);
      throw new Error('User alrady exists with the same email');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      email,
      name,
      password: hashedPassword,
    });

    if (!newUser) {
      res.status(400);
      throw new Error('Invalid user data');
    }
    const token = generateToken(newUser._id);

    res.status(201).json({
      email: newUser.email,
      _id: newUser._id,
      name: newUser.name,
      isAdmin: newUser.isAdmin,
      token: token,
    });
  } catch (error) {
    res.send(error.name + ' : ' + error.message);
  }
});

// --------------------------------------------------------
// @desc    GET user profile
// @route   GET  /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      email: user.email,
      _id: user._id,
      name: user.name,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User Not Found');
  }
});

// --------------------------------------------------------
// @desc    Update user profile
// @route   PUT  /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  console.log(req.user.name);
  console.log(req.body.name);
  if (user) {
    user.name = req.body.name;
    user.email = req.body.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      email: updatedUser.email,
      _id: updatedUser._id,
      name: updatedUser.name,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User Not Found');
  }
});
