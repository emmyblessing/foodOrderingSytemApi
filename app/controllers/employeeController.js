const crypto = require('crypto');
const Employees = require('../models/employees.model');
const { destroySession, setEmployeeSession } = require('./sessionController');

class EmployeeController {
  constructor() {
    /**
     * Return all employees
     */
    this.getAllEmployees = (req, res, next) => {
      Employees.find()
        .then((values) => {
          res.json({
            success: true,
            data: values,
          });
        })
        .catch(next);
    };

    /**
     * Return a particular employee
     */
    this.getEmployee = (req, res, next) => {
      const { eID } = req.params;
      Employees.findById(eID)
        .then((value) => {
          if (!value) {
            return next({ message: 'Employee not Found', status: 404 });
          }
          return res.json({
            success: true,
            data: value,
          });
        })
        .catch(next);
    };

    /**
     * Create an employee
     */
    this.createEmployee = (req, res, next) => {
      // Validate employees
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

      const employees = new Employees({
        fullname: req.body.fullname,
        email: req.body.email,
        password: hash.digest('hex'),
        phone: req.body.phone,
        sex: req.body.sex,
        address: req.body.address,
        town: req.body.town,
        state: req.body.state,
        position: req.body.position,
      });

      return employees.save()
        .then((employee) => {
          res.json({
            success: true,
            data: employee,
          });
        })
        .catch(next);
    };

    /**
     * Edit an employee
     */
    this.editEmployee = (req, res, next) => {
      const { eID } = req.params;
      const {
        fullname, email, phone, sex, address, town, state, position,
      } = req.body;
      Employees.findByIdAndUpdate(eID, {
        fullname,
        email,
        phone,
        sex,
        address,
        town,
        state,
        position,
        updatedAt: new Date(),
      }).then((employee) => {
        if (!employee) {
          return next({ message: 'Employee not found', status: 404 });
        }
        return res.json({
          success: true,
          data: employee,
        });
      }).catch(next);
    };

    /**
     * Delete an employee
     */
    this.deleteEmployee = (req, res, next) => {
      const { eID } = req.params;
      Employees.findByIdAndRemove(eID)
        .then((employee) => {
          if (!employee) {
            return next({ message: 'Employee not found', status: 404 });
          }
          return res.json({
            success: true,
            message: 'Employee deleted successfully',
          });
        }).catch(next);
    };

    /**
     * Login Employee
     */
    this.login = (req, res, next) => {
      const { email, password } = req.body;
      const hash = crypto.createHash('sha256');
      hash.update(password);
      Employees.findOne({ email, password: hash.digest('hex') })
        .then((data) => {
          if (!data) {
            return next({ message: 'Invalid email or password' });
          }
          setEmployeeSession(res, data);
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
      Employees.findOneAndUpdate({ email, newPassword: hash.digest('hex') })
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

module.exports = new EmployeeController();
