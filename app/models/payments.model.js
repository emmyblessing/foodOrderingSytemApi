const mongoose = require('mongoose');

const { Schema } = mongoose;
const paymentsSchema = new Schema({
  user: {
    type: String,
  },
  order: {
    type: String,
  },
  method: {
    type: String,
  },
  total: {
    type: Number,
  },
  status: {
    type: String,
    enum: ['Paid', 'Unpaid'],
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Payments = mongoose.model('Payments', paymentsSchema);
module.exports = Payments;
