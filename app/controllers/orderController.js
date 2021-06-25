const Orders = require('../models/orders.model');

class OrdersController {
  constructor() {
    /**
     * Return all orders
     */
    this.getOrders = (req, res, next) => {
      Orders.find()
        .then((values) => {
          res.json({
            success: true,
            data: values,
          });
        })
        .catch(next);
    };

    /**
     * Return an order
     */
    this.getOrder = (req, res, next) => {
      const { oID } = req.params;
      Orders.findById(oID)
        .then((value) => {
          if (!value) {
            return next({ message: 'Order not found', status: 404 });
          }
          return res.json({
            success: true,
            data: value,
          });
        })
        .catch(next);
    };

    /**
     * Create an order
     */
    this.createOrder = (req, res, next) => {
      const {
        user, menu, quantity, total,
      } = req.body;
      const orders = new Orders({
        user,
        menu,
        quantity,
        total,
        createdAt: Date.now(),
      });

      orders.save()
        .then((order) => {
          res.json({
            success: true,
            data: order,
          });
        }).catch(next);
    };

    /**
     * Edit an order
     */
    this.editOrder = (req, res, next) => {
      const { oID } = req.params;
      const {
        user, menu, quantity, total,
      } = req.body;
      Orders.findByIdAndUpdate(oID, {
        user,
        menu,
        quantity,
        total,
        updateAt: Date.now(),
      }).then((order) => {
        if (!order) {
          return next({ message: 'Order not Found', status: 404 });
        }
        return res.json({
          success: true,
          data: order,
        });
      }).catch(next);
    };

    /**
     * Delete order
     */
    this.deleteOrder = (req, res, next) => {
      const { oID } = req.params;
      Orders.findByIdAndDelete(oID)
        .then((order) => {
          if (!order) {
            return next({ message: 'Order not Found', status: 404 });
          }
          return res.json({
            success: true,
            message: 'Order Deleted Successfully',
          });
        }).catch(next);
    };
  }
}
module.exports = new OrdersController();
