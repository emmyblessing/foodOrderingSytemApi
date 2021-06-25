const express = require('express');
const {
  getAllUsers, getUser, createUser, editUser, deleteUser, login, logout, resetPassword,
} = require('../controllers/userController');

const userRouter = express.Router();

/**
 * GET: Route to display all users
 */
userRouter.get('/', getAllUsers);

/**
 * POST: Route to create a particular user
 */
userRouter.post('/', createUser);

/**
 * POST: Route to login
 */
userRouter.post('/login', login);

/**
 * POST: Route to logout
 */
userRouter.post('/logout', logout);

/**
 * PUT: Route to reset password
 */
userRouter.put('/resetPassword', resetPassword);

/**
 * GET: Route to display a particular user
 */
userRouter.get('/:uID', getUser);

/**
 * PUT: Route to edit a particular user
 */
userRouter.put('/:uID', editUser);

/**
 * DELETE: Route to delete a particular user
 */
userRouter.delete('/:uID', deleteUser);

module.exports = userRouter;
