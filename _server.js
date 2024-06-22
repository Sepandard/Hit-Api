const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const path = require('path');
const colors = require('colors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json');
const ResponseMessage = require('./contract/responseMessages');

// Initialize express app
const app = express();
dotenv.config({ path: './config/config.env' });
const initModules = require('./_initModule');
require('./config/postgres');


// Middleware
app.use(express.json());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, '/public')));
app.use('*', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_APP_HOST);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Development logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Initialize express-ws
const expressWs = require('express-ws')(app);
 
// Initialize modules
initModules(app);

// Serve Swagger documentation
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Handle 404 error
app.use('*', (req, res, next) => {
  res.status(404).json(ResponseMessage.NOT_FOUND);
});

// Start the server
const PORT = process.env.PORT || 5020;
const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});

// Handle unhandled rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});
