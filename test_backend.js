const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

const test = async () => {
  try {
    console.log('--- Starting Backend Verification ---');

    // 1. Register
    console.log('Testing Registration...');
    const regRes = await axios.post(`${BASE_URL}/auth/register`, {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    });
    console.log('Registration Success:', regRes.data.success);

    // 2. Login
    console.log('Testing Login...');
    const loginRes = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'test@example.com',
      password: 'password123',
    });
    const token = loginRes.data.data.token;
    console.log('Login Success, Token obtained');

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    // 3. Create Product
    console.log('Testing Product Creation...');
    const prodRes = await axios.post(`${BASE_URL}/products`, {
      name: 'Test Product',
      category: 'Electronics',
      type: 'Phone',
      price: 999,
      in_stock: true,
      description: 'A great test product',
    }, config);
    const productId = prodRes.data.data._id;
    console.log('Product Created, ID:', productId);

    // 4. Get Products
    console.log('Testing Get Products...');
    const getProdsRes = await axios.get(`${BASE_URL}/products`);
    console.log('Get Products Success, Count:', getProdsRes.data.data.length);

    // 5. Update Product
    console.log('Testing Product Update...');
    await axios.put(`${BASE_URL}/products/${productId}`, {
      price: 899,
    }, config);
    console.log('Product Update Success');

    // 6. Get Users (Protected)
    console.log('Testing Get Users...');
    const getUsersRes = await axios.get(`${BASE_URL}/users`, config);
    console.log('Get Users Success, Count:', getUsersRes.data.data.length);

    // 7. Delete Product
    console.log('Testing Product Deletion...');
    await axios.delete(`${BASE_URL}/products/${productId}`, config);
    console.log('Product Deletion Success');

    console.log('--- Verification Completed Successfully ---');
    process.exit(0);
  } catch (error) {
    console.error('Verification Failed:', error.response ? error.response.data : error.message);
    process.exit(1);
  }
};

test();
