const express = require('express');
const {
  getOrders, getOrder, createOrder, editOrder, deleteOrder,
} = require('../controllers/orderController');

const orderRouter = express.Router();

/**
 * GET: Route to display all order
 */
orderRouter.get('/', getOrders);

/**
 * POST: Route to create an order
 */
orderRouter.post('/', createOrder);

/**
 * GET: Route to display a particular order
 */
orderRouter.get('/:oID', getOrder);

/**
 * PUT: Route to edit a particular order
 */
orderRouter.put('/:oID', editOrder);

/**
 * DELETE: Route to delete a particular order
 */
orderRouter.delete('/:oID', deleteOrder);

module.exports = orderRouter;
