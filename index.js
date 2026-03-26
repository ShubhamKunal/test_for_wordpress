const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const { errorHandler, notFound } = require('./src/middlewares/errorHandler');
const routes = require('./src/routes');
const { swaggerUi, specs } = require('./src/config/swagger');

// Load env vars
dotenv.config();

const app = express();

// Body parser
app.use(express.json());

// MiddleWare to Ensure MongoDB Connection for each request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
});

// Swagger Documentation at root /
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css";
app.use('/', swaggerUi.serve);
app.get('/', swaggerUi.setup(specs, {
  customCssUrl: CSS_URL,
  customCss: '.swagger-ui .topbar { display: none }'
}));

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
