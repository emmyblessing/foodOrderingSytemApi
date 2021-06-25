const Menus = require('../models/menus.model');

class MenuController {
  constructor() {
    /**
     * Return all menus
     */
    this.getMenus = (req, res, next) => {
      Menus.find()
        .then((values) => {
          res.json({
            success: true,
            data: values,
          });
        })
        .catch(next);
    };

    /**
     * Return a menu
     */
    this.getMenu = (req, res, next) => {
      const { mID } = req.params;
      Menus.findById(mID)
        .then((value) => {
          if (!value) {
            return next({ message: 'Menu not found', status: 404 });
          }
          return res.json({
            success: true,
            data: value,
          });
        }).catch(next);
    };

    /**
     * Create a Menu
     */
    this.createMenu = (req, res, next) => {
      const values = Object.values(req.body);
      if (values < 4 || values.includes(null)) {
        return next({ message: 'Required field must not be empty', status: 404 });
      }

      const {
        name, description, category, price,
      } = req.body;
      const menus = new Menus({
        name,
        description,
        category,
        price,
        createdAt: new Date(),
      });

      return menus.save()
        .then((menu) => {
          res.json({
            success: true,
            data: menu,
          });
        })
        .catch(next);
    };

    /**
     * Edit a menu
     */
    this.editMenu = (req, res, next) => {
      const { mID } = req.params;
      const {
        name, description, category, price,
      } = req.body;
      Menus.findByIdAndUpdate(mID, {
        name,
        description,
        category,
        price,
        createdAt: new Date(),
      }).then((menu) => {
        if (!menu) {
          return next({ message: 'Menu not found', status: 404 });
        }
        return res.json({
          success: true,
          data: menu,
        });
      }).catch(next);
    };

    /**
     * Delete a Menu
     */
    this.deleteMenu = (req, res, next) => {
      const { mID } = req.params;

      Menus.findByIdAndDelete(mID)
        .then((menu) => {
          if (!menu) {
            return next({ message: 'Menu not found', status: 404 });
          }
          return res.json({
            success: true,
            message: 'Menu deleted successfully',
          });
        })
        .catch(next);
    };
  }
}

module.exports = new MenuController();
