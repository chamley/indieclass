const db = require('../Models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.getUsers = async (req, res) => {
  try {
    const allUsers = await db.user.findAll();
    res.json(allUsers);
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
      where: { user_id: req.user_id },
    });
    if (!usr) {
      res.status(404);
      res.json('Record not found');
    } else {
      res.json(usr);
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
    const assignedClass = await db.class.findOne({
      where: { class_id: req.body.class_id },
    });
    if (req.user_id === assignedClass.teacher_id) {
      res.status(401).json('You cannot sign up for your own class!');
    } else if (assignedClass.signedup === assignedClass.limit) {
      res.status(401).json('The class is full!');
    } else {
      await db.student_class.create({
        user_id: req.user_id,
        ...req.body,
      });

      await assignedClass
        .increment('signedup')
        .then((updatedClass) => {
          return updatedClass.reload();
        })
        .then((updatedClass) => {
          res.json(updatedClass);
        });
    }
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    res.status(500);
    res.json(error);
  }
};

exports.editBio = async (req, res) => {
  try {
    const teacher = await db.user.findOne({
      where: { user_id: req.user_id },
    });
    if (!teacher) {
      res.status(404);
      res.json('Record not found');
    } else {
      teacher.bio = req.body.bio;
      await teacher.save();
    }
    res.json(teacher);
    res.status(200);
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    res.status(500);
    res.json(error);
  }
};

exports.addPayment = async (req, res) => {
  try {
    const usr = await db.user.findOne({
      where: { user_id: req.user_id },
    });
    if (!usr) {
      res.status(404);
      res.send('Record not found');
    } else {
      usr.lastfour = req.body.lastfour;
      usr.stripe_token = req.body.stripe_token;
      await usr.save();
    }
    res.send(usr);
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
    const newUser = await db.user.findOne({ where: { email: req.user.email } });
    const token = jwt.sign(
      { user_id: newUser.user_id },
      process.env.SECRET_SIGNATURE
    );
    const encodedUser = {
      firstname: newUser.dataValues.firstname,
      lastname: newUser.dataValues.lastname,
      bio: newUser.dataValues.bio,
      lastfour: newUser.dataValues.lastfour,
      paymentToken: newUser.dataValues.stripe_token,
      token: token,
    };
    res.status(201).json(encodedUser);
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    res.status(404).json({ error, message: 'Resource not found' });
  }
};

exports.createTeacher = async (req, res) => {
  try {
    const existingUser = await db.user.findOne({
      where: { user_id: req.user_id },
    });

    if (!existingUser) {
      res.status(404);
      res.json('Your are not found');
    } else if (existingUser.isteacher === false) {
      existingUser.isteacher = true;
      existingUser.save();
    }

    const existingTeacher = await db.teacher.findOne({
      where: { user_id: req.user_id },
    });

    if (existingTeacher) {
      res.status(404);
      res.json('You are already a teacher!');
    } else {
      const extraTeacherInfo = await db.teacher.create({
        user_id: req.user_id,
        ...req.body,
      });
      const teacherinUsers = await db.user.findOne({
        where: { user_id: req.user_id },
      });
      res.status(201);
      res.json({
        firstname: teacherinUsers.firstname,
        lastname: teacherinUsers.lastname,
        bio: extraTeacherInfo.bio,
        talent_field: extraTeacherInfo.talent_field,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ err, message: 'Resource not found' });
  }
};

exports.getTeacher = async (req, res) => {
  try {
    const teacher = await db.teacher.findOne({
      where: { user_id: res.body },
    });
    if (!teacher) {
      res.json('This teacher does not exist');
      res.status(404);
    } else {
      res.json(teacher);
      res.status(200);
    }
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    res.status(500);
    res.json(error);
  }
};

exports.editBio = async (req, res) => {
  try {
    const user = await db.user.findOne({
      where: { user_id: req.user_id },
    });
    user.bio = req.body.bio;
    await user.save();
    res.send(user);
    res.status(200);
  } catch (e) {
    console.log('update bio not working: ', e);
    res.status(500);
    res.json(e);
  }
};
