const User = require('../models/User');

const getAllUsers = async () => {
  return await User.find({});
};

const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

const deleteUser = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('User not found');
  }
  await user.deleteOne();
  return { message: 'User removed' };
};

const syncUsers = async (userDataArray) => {
  if (!Array.isArray(userDataArray)) {
    throw new Error('Input must be an array of users');
  }
  return await User.create(userDataArray);
};

module.exports = {
  getAllUsers,
  getUserById,
  deleteUser,
  syncUsers,
};
