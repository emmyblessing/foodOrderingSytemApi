const express = require('express');
const {
  getMenus, getMenu, createMenu, editMenu, deleteMenu,
} = require('../controllers/menuController');

const menuRouter = express.Router();

/**
 * GET: Route to display all menu
 */
menuRouter.get('/', getMenus);

/**
 * GET: Route to display a particular menu
 */
menuRouter.get('/:mID', getMenu);

/**
 * POST: Route to create a menu
 */
menuRouter.post('/', createMenu);

/**
 * PUT: Route to edit a menu
 */
menuRouter.put('/:mID', editMenu);

/**
 * DELETE: Route to delete a menu
 */
menuRouter.delete('/:mID', deleteMenu);

module.exports = menuRouter;
