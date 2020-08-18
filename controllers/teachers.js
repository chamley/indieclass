const db = require('../models');
exports.createTeacher = async (req, res) => {
  const cls = req.body;
  try {
    console.log('create a new teacher');
    await db.teacher.create({
      firstname: cls.firstname,
      lastname: cls.lastname,
      email: cls.email,
      bio: cls.bio,
    });
    res.send('Create a teacher');
    res.status(201);
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    res.status(500);
    res.json(error);
  }
};

exports.getTeachers = async (req, res) => {
  try {
    console.log('getting all teachers');
    res.send('All teachers');
    res.status(200);
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    res.status(500);
    res.json(error);
  }
};
