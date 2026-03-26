const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const { errorHandler, notFound } = require('./src/middlewares/errorHandler');
const routes = require('./src/routes');
const { swaggerUi, specs } = require('./src/config/swagger');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Swagger Documentation at root /
app.use('/', swaggerUi.serve);
app.get('/', swaggerUi.setup(specs));

// API Routes
app.use('/api', routes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
}

module.exports = app;
