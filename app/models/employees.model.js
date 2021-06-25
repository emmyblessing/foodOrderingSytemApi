const mongoose = require('mongoose');

const { Schema } = mongoose;
const employeesSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  town: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
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

const Employees = mongoose.model('Employees', employeesSchema);
module.exports = Employees;
