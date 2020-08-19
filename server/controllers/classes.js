const db = require('../models');

// CLASSES - TEACHER
// Create class
// Creates a new database entry in classes table and ensures relationship to categories table and teachers table
exports.createClass = async (req, res) => {
  try {
    const classEntry = {
      ...req.body,
    };
    const cls = await db.class.create(classEntry);
    res.send(cls);
    res.status(201);
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    res.status(500);
    res.json(error);
  }
};

// Delete Class
// Removes a new database entry in classes table
exports.deleteClass = async (req, res) => {
  try {
    const cls = await db.class.findOne({
      where: {
        class_id: req.params.classid,
      },
    });
    if (!cls) {
      res.status(404);
      res.send('Record not found');
    } else {
      cls.destroy();
    }
    res.sendStatus(204);
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    res.status(500);
    res.json(error);
  }
};

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
};

// Get teacher's classes
// Looks up all class ID's in the teacher-class binding table that relate to the teacher ID, and then returns the class entries from the class table for relating the the class IDs
exports.getClasses = async (req, res) => {
  try {
    const teacher = await db.user.findByPk(req.params.user_id);
    if (!teacher) {
      res.status(404);
      res.send('Teacher not found');
    } else {
      const classes = await db.class.findAll({
        where: {
          teacher_id: req.params.user_id,
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

exports.getOneClass = async (req, res) => {
  try {
    const cls = await db.class.findOne({
      where: { class_id: req.params.classid },
    });
    if (!cls) {
      res.status(404);
      res.send('Record not found');
    } else {
      res.send(cls);
    }
    res.status(200);
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    res.status(500);
    res.json(error);
  }
};

exports.getClassesByStudent = async (req, res) => {
  try {
    const classIds = await db.student_class.findAll({
      where: { user_id: req.params.studentid },
    });
    if (!classIds) res.send('Go sign up for a class now!');
    else {
      const mapClasses = (myArray) => {
        const promises = myArray.map(async (relationship) => {
          let singleClass = await db.class.findOne({
            where: { class_id: relationship.class_id },
          });
          return singleClass.dataValues;
        });
        return Promise.all(promises);
      };
      mapClasses(classIds).then((studentClasses) => res.send(studentClasses));
    }
    res.status(200);
  } catch (error) {
    console.log(error); //eslint-disable-line no-console
    res.status(500);
    res.json(error);
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const cls = await db.class.findOne({
      where: { class_id: req.params.classid },
    });
    if (!cls) {
      res.status(404);
      res.send('Record not found');
    } else {
      if (cls.paid === true) res.send('You paid');
      else cls.paid = true;
      await cls.save();
    }
    res.send(cls);
    res.status(200);
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    res.status(500);
    res.json(error);
  }
};
