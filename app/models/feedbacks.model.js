const mongoose = require('mongoose');

const { Schema } = mongoose;

const feedbackSchema = new Schema({
  user: {
    type: String,
  },
  message: {
    type: String,
  },
  response: {
    type: String,
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

const Feedbacks = mongoose.model('Feedbacks', feedbackSchema);
module.exports = Feedbacks;
