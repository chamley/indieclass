const db = require('../models');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await db.category.findAll();
    res.send(categories);
    res.status(200);
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    res.status(500);
    res.json(error);
  }
};
exports.getClassesByCategory = async (req, res) => {
  try {
    const cat = await db.category.findByPk(req.params.categoryid);
    if (!cat) {
      res.status(404);
      res.send('Category not found');
    } else {
      const classes = await db.class.findAll({
        where: {
          category_id: req.params.categoryid,
        },
      });
      res.send(classes);
      res.status(200);
    }
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    res.status(500);
    res.json(error);
  }
};
