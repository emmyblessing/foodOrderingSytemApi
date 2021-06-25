const express = require('express');
const {
  getPayments, getPayment, createPayment, editPayment, deletePayment,
} = require('../controllers/paymentController');

const paymentRouter = express.Router();

/**
 * GET: Route to display all payment
 */
paymentRouter.get('/', getPayments);

/**
 * POST: Route to create a payment
 */
paymentRouter.post('/', createPayment);

/**
 * GET: Route to display a particular payment
 */
paymentRouter.get('/:pID', getPayment);

/**
 * PUT: Route to edit a particular payment
 */
paymentRouter.put('/:pID', editPayment);

/**
 * DELETE: Route to delete a particular payment
 */
paymentRouter.delete('/:pID', deletePayment);

module.exports = paymentRouter;
