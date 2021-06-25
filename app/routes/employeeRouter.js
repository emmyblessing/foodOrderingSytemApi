const express = require('express');
const {
  getAllEmployees, getEmployee, createEmployee, editEmployee, deleteEmployee, login,
  logout, resetPassword,
} = require('../controllers/employeeController');

const employeeRouter = express.Router();

/**
 * GET: Route to display all employees
 */
employeeRouter.get('/', getAllEmployees);

/**
 * POST: Route to create a particular employee
 */
employeeRouter.post('/', createEmployee);

/**
 * POST: Route to login
 */
employeeRouter.post('/login', login);

/**
 * POST: Route to logout
 */
employeeRouter.post('/logout', logout);

/**
 * PUT: Route to reset password
 */
employeeRouter.put('/resetPassword', resetPassword);

/**
 * GET: Route to display a particular employee
 */
employeeRouter.get('/:eID', getEmployee);

/**
 * PUT: Route to edit a particular employee
 */
employeeRouter.put('/:eID', editEmployee);

/**
 * DELETE: Route to delete a particular employee
 */
employeeRouter.delete('/:eID', deleteEmployee);

module.exports = employeeRouter;
