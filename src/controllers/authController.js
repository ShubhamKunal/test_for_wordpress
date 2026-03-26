const authService = require('../services/authService');
const { formatResponse } = require('../utils/response');

const register = async (req, res, next) => {
  try {
    const data = await authService.registerUser(req.body);
    res.status(201).json(formatResponse(true, data, 'User registered successfully'));
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = await authService.loginUser(email, password);
    res.status(200).json(formatResponse(true, data, 'Login successful'));
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  // Stateless logout
  res.status(200).json(formatResponse(true, null, 'Logout successful'));
};

module.exports = { register, login, logout };
