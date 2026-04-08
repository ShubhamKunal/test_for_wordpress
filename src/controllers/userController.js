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
    const { users } = req.body;
    if (!users || !Array.isArray(users)) {
      return res.status(400).json(formatResponse(false, null, 'Invalid input: "users" array is required'));
    }
    const syncedUsers = await userService.syncUsers(users);
    res.status(201).json(formatResponse(true, syncedUsers, 'Users synced successfully'));
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
