const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const registerUser = async (userData) => {
  const { username, email, password } = userData;
  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error('User already exists');
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  if (user) {
    return {
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    };
  } else {
    throw new Error('Invalid user data');
  }
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    return {
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    };
  } else {
    throw new Error('Invalid email or password');
  }
};

module.exports = { registerUser, loginUser };
