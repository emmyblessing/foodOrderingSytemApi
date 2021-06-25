const Payments = require('../models/payments.model');

class PaymentController {
  constructor() {
    /**
     * Return all payments
     */
    this.getPayments = (req, res, next) => {
      Payments.find()
        .then((values) => {
          res.json({
            success: true,
            data: values,
          });
        }).catch(next);
    };

    /**
     * Return a payment
     */
    this.getPayment = (req, res, next) => {
      const { pID } = req.params;
      Payments.findById(pID)
        .then((value) => {
          if (!value) {
            return next({ message: 'Payment not Found', status: 404 });
          }
          return res.json({
            success: true,
            data: value,
          });
        }).catch(next);
    };

    /**
     * Create payment
     */
    this.createPayment = (req, res, next) => {
      const {
        user, order, method, total, status,
      } = req.body;

      const payments = new Payments({
        user,
        order,
        method,
        total,
        status,
        createdAt: Date.now(),
      });

      payments.save()
        .then((payment) => {
          res.json({
            success: true,
            data: payment,
          });
        }).catch(next);
    };

    /**
     * Edit Payments
     */
    this.editPayment = (req, res, next) => {
      const { pID } = req.params;
      const {
        user, order, method, total, status,
      } = req.body;
      Payments.findByIdAndUpdate(pID, {
        user,
        order,
        method,
        total,
        status,
      })
        .then((payment) => {
          if (!payment) {
            return next({ message: 'Payment not Found', status: 404 });
          }
          return res.json({
            success: true,
            data: payment,
          });
        }).catch(next);
    };

    /**
     * Delete Payment
     */
    this.deletePayment = (req, res, next) => {
      const { pID } = req.params;
      Payments.findByIdAndDelete(pID)
        .then((payment) => {
          if (!payment) {
            return next({ message: 'Payment not Found', status: 404 });
          }
          return res.json({
            success: true,
            message: 'Payment Deleted Successfully',
          });
        }).catch(next);
    };
  }
}

module.exports = new PaymentController();
