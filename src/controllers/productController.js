const productService = require('../services/productService');
const { formatResponse } = require('../utils/response');

const getProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(formatResponse(true, products));
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.status(200).json(formatResponse(true, product));
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(formatResponse(true, product, 'Product created successfully'));
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    res.status(200).json(formatResponse(true, product, 'Product updated successfully'));
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const message = await productService.deleteProduct(req.params.id);
    res.status(200).json(formatResponse(true, null, message.message));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
