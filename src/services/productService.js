const Product = require('../models/Product');

const getAllProducts = async () => {
  return await Product.find({});
};

const getProductById = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
};

const createProduct = async (productData) => {
  return await Product.create(productData);
};

const updateProduct = async (id, productData) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new Error('Product not found');
  }

  Object.assign(product, productData);
  return await product.save();
};

const deleteProduct = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new Error('Product not found');
  }
  await product.deleteOne();
  return { message: 'Product removed' };
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
