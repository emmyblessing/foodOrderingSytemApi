const Feedbacks = require('../models/feedbacks.model');

class FeedbackController {
  constructor() {
    /**
     * Return all feedbacks
    */
    this.getFeedbacks = (req, res, next) => {
      Feedbacks.find()
        .then((values) => {
          res.json({
            success: true,
            data: values,
          });
        })
        .catch(next);
    };

    /**
     * Return a particular feedback
     */
    this.getFeedback = (req, res, next) => {
      const { fID } = req.params;
      Feedbacks.findById(fID)
        .then((value) => {
          if (!value) {
            return next({ message: 'Feedback not found', status: 404 });
          }
          return res.json({
            success: true,
            data: value,
          });
        })
        .catch(next);
    };

    /**
     * Create a feedback
     */
    this.createFeedback = (req, res, next) => {
      const { user, message, response } = req.body;
      const feedbacks = new Feedbacks({
        user,
        message,
        response,
        createdAt: new Date(),
      });

      feedbacks.save()
        .then((feedback) => {
          res.json({
            success: true,
            data: feedback,
          });
        })
        .catch(next);
    };

    /**
     * Edit a feedback
     */
    this.editFeedback = (req, res, next) => {
      const { user, message, response } = req.body;
      const { fID } = req.params;

      Feedbacks.findByIdAndUpdate(fID, {
        user,
        message,
        response,
        updateAt: new Date(),
      }).then((feedback) => {
        if (!feedback) {
          return next({ message: 'Feedback not found', status: 404 });
        }
        return res.json({
          success: true,
          data: feedback,
        });
      }).catch(next);
    };

    /**
     * Delete a feedback
     */
    this.deleteFeedback = (req, res, next) => {
      const { fID } = req.params;

      Feedbacks.findByIdAndDelete(fID)
        .then((feedback) => {
          if (!feedback) {
            return next({ message: 'Feedback not found', status: 404 });
          }
          return res.json({
            success: true,
            message: 'Feedback successfully deleted',
          });
        })
        .catch(next);
    };
  }
}

module.exports = new FeedbackController();
