const db = require('../Models/index');
const { sequelize } = require('../Models/index');

// CLASSES - TEACHER
// Create class
// Creates a new database entry in classes table and ensures relationship to categories table and teachers table
exports.createClass = async (req, res) => {
  try {
    const cat = await db.category.findByPk(req.body.category_id);
    const teacher = await db.teacher.findByPk(req.body.teacher_id) // Will eventually come through JWT or session info;
    const classEntry = {
      ...req.body,
      category_id: cat.dataValues.category_id,
      teacher_id: teacher.teacher_id
    }
    const cls = await db.class.create(classEntry);
    res.send(cls);
    res.status(201);
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    res.status(500);
    res.json(error);
  }
}

// Delete Class
// Removes a new database entry in classes table
exports.deleteClass = async (req, res) => {
  try {
    const cls = await db.class.findOne({
      where: {
        class_id: req.body.class_id
      }
    })
    if (!cls) {
      res.status(404);
      res.send("Record not found");
    } else {
      cls.destroy();
    }
    res.sendStatus(204);
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    res.status(500);
    res.json(error);
  }
}

// Get All classes
// Get's all classes in db
exports.getAllClasses = async (req, res) => {
  try {
    const classes = await db.class.findAll();
    res.send(classes);
    res.status(200);
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    res.status(500);
    res.json(error);
  }
}

// Get teacher's classes
// Looks up all class ID's in the teacher-class binding table that relate to the teacher ID, and then returns the class entries from the class table for relating the the class IDs
exports.getClasses = async (req, res) => {
  try {
    const teacher = await db.teacher.findByPk(req.params.teacher_id);
    console.log('teacher',teacher)
    if (!teacher) {
      res.status(404);
      res.send("Teacher not found");
    } else {
      const classes = await db.class.findAll({
        where: {
          teacher_id: req.params.teacher_id
        }
      });
      res.send(classes);
      res.status(200);
    }
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    res.status(500);
    res.json(error);
  }
}


