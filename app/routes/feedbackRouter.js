const express = require('express');
const {
  getFeedbacks, getFeedback, createFeedback, editFeedback, deleteFeedback,
} = require('../controllers/feedbackController');

const feedbackRouter = express.Router();

/**
 * GET: Route to display all feedbacks
 */
feedbackRouter.get('/', getFeedbacks);

/**
 * POST: Route to create feedback
 */
feedbackRouter.post('/', createFeedback);

/**
 * GET: Route to display a particular feedback
 */
feedbackRouter.get('/:fID', getFeedback);

/**
 * PUT: Route to edit feedback
 */
feedbackRouter.put('/:fID', editFeedback);

/**
 * DELETE: Route to delete feedback
 */
feedbackRouter.delete('/:fID', deleteFeedback);

module.exports = feedbackRouter;
