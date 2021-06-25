const crypto = require('crypto');
const Users = require('../models/users.model');
const { destroySession, setUserSession } = require('./sessionController');

class UserController {
  constructor() {
    /**
     * Return all users
     */
    this.getAllUsers = (req, res, next) => {
      Users.find()
        .then((values) => {
          res.json({
            success: true,
            data: values,
          });
        })
        .catch(next);
    };

    /**
     * Return a particular user
     */
    this.getUser = (req, res, next) => {
      const { uID } = req.params;
      Users.findById(uID)
        .then((value) => {
          if (!value) {
            return next({ message: 'User not Found', status: 404 });
          }
          return res.json({
            success: true,
            data: value,
          });
        })
        .catch(next);
    };

    /**
     * Create an user
     */
    this.createUser = (req, res, next) => {
      // Validate users
      const values = Object.values(req.body);
      if (values < 8 || values.includes(null)) {
        return next({ message: 'Required fields cannot be empty', status: 400 });
      }

      // Validate password
      if (req.body.password.length < 7) {
        return next({ message: 'Password must contain at least 7 characters.', status: 400 });
      }

      const hash = crypto.createHash('sha256');
      hash.update(req.body.password);

      const users = new Users({
        fullname: req.body.fullname,
        email: req.body.email,
        password: hash.digest('hex'),
        phone: req.body.phone,
        sex: req.body.sex,
        address: req.body.address,
        town: req.body.town,
        state: req.body.state,
      });

      return users.save()
        .then((user) => {
          res.json({
            success: true,
            data: user,
          });
        })
        .catch(next);
    };

    /**
     * Edit an user
     */
    this.editUser = (req, res, next) => {
      const { uID } = req.params;
      const {
        fullname, email, phone, sex, address, town, state,
      } = req.body;
      Users.findByIdAndUpdate(uID, {
        fullname,
        email,
        phone,
        sex,
        address,
        town,
        state,
        updatedAt: new Date(),
      }).then((user) => {
        if (!user) {
          return next({ message: 'User not found', status: 404 });
        }
        return res.json({
          success: true,
          data: user,
        });
      }).catch(next);
    };

    /**
     * Delete an user
     */
    this.deleteUser = (req, res, next) => {
      const { uID } = req.params;
      Users.findByIdAndRemove(uID)
        .then((user) => {
          if (!user) {
            return next({ message: 'User not found', status: 404 });
          }
          return res.json({
            success: true,
            message: 'User deleted successfully',
          });
        }).catch(next);
    };

    /**
     * Login user
     */
    this.login = (req, res, next) => {
      const { email, password } = req.body;
      const hash = crypto.createHash('sha256');
      hash.update(password);
      Users.findOne({ email, password: hash.digest('hex') })
        .then((data) => {
          if (!data) {
            return next({ message: 'Invalid email or password' });
          }
          setUserSession(res, data);
          return res.json({
            success: true,
            data,
          });
        })
        .catch(next);
    };

    this.logout = (req, res) => {
      destroySession(res);
      res.json({
        success: true,
        data: null,
      });
    };

    this.resetPassword = (req, res, next) => {
      const { email, newPassword } = req.body;
      const hash = crypto.createHash('sha256');
      hash.update(newPassword);
      Users.findOneAndUpdate({ email, newPassword: hash.digest('hex') })
        .then((data) => {
          if (!data) {
            return next({ message: 'user not found', status: 404 });
          }
          return res.json({
            success: true,
            data,
          });
        })
        .catch(next);
    };
  }
}

module.exports = new UserController();
