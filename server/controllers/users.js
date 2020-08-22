const db = require('../models');

exports.createUser = async (req, res) => {
  const cls = req.body;
  try {
    console.log('creating a new user');
    res.send(
      await db.user.create({
        firstname: cls.firstname,
        lastname: cls.lastname,
        email: cls.email,
      })
    );
    res.status(201);
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    res.status(500);
    res.json(error);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const allUsers = await db.user.findAll();
    res.send(allUsers);
    res.status(200);
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    res.status(500);
    res.json(error);
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const usr = await db.user.findOne({
      where: { user_id: req.params.userid },
    });
    if (!usr) {
      res.status(404);
      res.send('Record not found');
    } else {
      res.send(usr);
    }
    res.status(200);
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    res.status(500);
    res.json(error);
  }
};

exports.assignUserToClass = async (req, res) => {
  try {
    await db.student_class.create({ ...req.body });
    res.send(
      await db.class.findOne({ where: { class_id: req.body.class_id } })
    );
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    res.status(500);
    res.json(error);
  }
};

exports.upgradeToTeacher = async (req, res) => {
  try {
    const teacher = await db.user.findOne({
      where: { user_id: req.params.userid },
    });
    if (!teacher) {
      res.status(404);
      res.send('Record not found');
    } else {
      if (teacher.isteacher === true)
        res.send('You have  already signed up as a teacher');
      else teacher.isteacher = true;
      await teacher.save();
    }
    res.send(teacher);
    res.status(200);
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    res.status(500);
    res.json(error);
  }
};

exports.profile = async (req, res) => {
  try {
    const existingUser = await db.user.findOne({
      where: { email: req.user.email },
    });
    if (!existingUser) {
      await db.user.create({
        ...req.user,
      });
    }
    res
      .status(201)
      .send(await db.user.findOne({ where: { email: req.user.email } }));
  } catch (error) {
    res.status(404).send({ error, message: 'Resource not found' });
  }
};

exports.createTeacher = async (req, res) => {
  try {
    const existingUser = await db.user.findOne({
      where: { user_id: req.params.userid },
    });

    if (!existingUser) {
      res.status(404);
      res.send('You are not found');
    } else if (existingUser.isteacher === false) {
      existingUser.isteacher = true;
      existingUser.save();
    }

    const existingTeacher = await db.teacher.findOne({
      where: { user_id: req.params.userid },
    });

    if (existingTeacher) {
      res.status(404);
      res.send('You are already a teacher!');
    } else {
      const extraTeacherInfo = await db.teacher.create({
        user_id: req.params.userid,
        ...req.body,
      });
      const teacherinUsers = await db.user.findOne({
        where: { user_id: req.params.userid },
      });
      res.status(201);
      console.log([
        ...extraTeacherInfo,
        teacherinUsers.firstname,
        teacherinUsers.lastname,
      ]);
      res.send([
        ...extraTeacherInfo,
        teacherinUsers.firstname,
        teacherinUsers.lastname,
      ]);
    }
  } catch (err) {
    res.status(404).send({ err, message: 'Resource not found' });
  }
};
