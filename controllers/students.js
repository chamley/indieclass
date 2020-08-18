// CLASSES - STUDENT
const db = require('../models');
exports.createStudent = async (req, res) => {
  const cls = req.body;
  try {
    console.log('create a new student');
    await db.student.create({
      firstname: cls.firstname,
      lastname: cls.lastname,
      email: cls.email,
    });
    res.send('Create a student');
    res.status(201);
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    res.status(500);
    res.json(error);
  }
};

exports.getStudents = async (req, res) => {
  try {
    console.log('getting all students');
    res.send('All students');
    res.status(200);
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    res.status(500);
    res.json(error);
  }
};
