const mongoose = require('mongoose');

const { Schema } = mongoose;
const ordersSchema = new Schema({
  user: {
    type: String,
  },
  menu: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  total: {
    type: Number,
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

const Orders = mongoose.model('Orders', ordersSchema);
module.exports = Orders;
