const userService = require('../services/userService');
const { formatResponse } = require('../utils/response');

const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(formatResponse(true, users));
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json(formatResponse(true, user));
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const message = await userService.deleteUser(req.params.id);
    res.status(200).json(formatResponse(true, null, message.message));
  } catch (error) {
    next(error);
  }
};

const syncUsers = async (req, res, next) => {
  try {
    const users = await userService.syncUsers(req.body);
    res.status(201).json(formatResponse(true, users, 'Users synced successfully'));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  deleteUser,
  syncUsers,
};
