const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const env = require('dotenv');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const userRouter = require('./routes/userRouter');
const employeeRouter = require('./routes/employeeRouter');
const feedbackRouter = require('./routes/feedbackRouter');
const menuRouter = require('./routes/menuRouter');
const orderRouter = require('./routes/orderRouter');
const paymentRouter = require('./routes/paymentRouter');
const { checkUserSession, checkEmployeeSession } = require('./controllers/sessionController');

// initialize configuration file
env.config();

// Create express app
const app = express();

// Cookie middleware
app.use(cookieParser(process.env.APP_SECRET));

// Parse request of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Parse request of content-type - application/json
app.use(bodyParser.json());

// Middleware to connect to http
app.use(cors({ origin: '*' }));

// Middleware to display routes details on the bash command
app.use(logger('dev'));

// Middleware to manage session
app.all(checkUserSession, checkEmployeeSession);

// Configuring the database
const connectionString = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

mongoose.Promise = global.Promise;

// Connecting to database
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Successfully connected to the database');
}).catch((err) => {
  console.log('Could not connect to the database', err.message);
});

// Listening port
const port = process.env.PORT || process.env.APP_PORT;

// Simple route for testing
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Food Ordering System API',
  });
});

// api router
app.use('/api/v1/users', userRouter);
app.use('/api/v1/employees', employeeRouter);
app.use('/api/v1/feedbacks', feedbackRouter);
app.use('/api/v1/menus', menuRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/payments', paymentRouter);

// Catch 404 error and forward to error handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: {
      message: 'Not Found',
    },
  });
  next();
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    success: false,
    error: {
      message: err.message,
    },
  });
});

app.listen(port, () => {
  console.log('Express server running on port ', port);
});
