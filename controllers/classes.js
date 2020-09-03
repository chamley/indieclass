const db = require('../Models');
const { fetchRequest } = require('../apiService');

exports.createClass = async (req, res) => {
  try {
    await fetchRequest(req.body.place_id).then(async (result) => {
      const classEntry = {
        ...req.body,
        lat: result.result.geometry.location.lat,
        lng: result.result.geometry.location.lng,
        address: result.result.formatted_address,
        teacher_id: req.user_id,
      };
      const cls = await db.class.create(classEntry);
      res.json(cls);
    });
    res.status(201);
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    res.status(500);
    res.json(error);
  }
};

exports.deleteClass = async (req, res) => {
  try {
    const cls = await db.class.findOne({
      where: {
        class_id: req.params.classid,
      },
    });
    if (!cls) {
      res.status(404);
      res.json('Record not found');
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

exports.getAllClasses = async (req, res) => {
  try {
    const classes = await db.class.findAll();
    res.json(classes);
    res.status(200);
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    res.status(500);
    res.json(error);
  }
};

exports.getClasses = async (req, res) => {
  try {
    const teacher = await db.user.findByPk(req.user_id);
    if (!teacher) {
      res.status(404);
      res.json('Teacher not found');
    } else {
      const classes = await db.class.findAll({
        where: {
          teacher_id: req.user_id,
        },
      });
      res.json(classes);
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
    const teacherId = cls.teacher_id;
    if (!cls) {
      res.status(404);
      res.json('Record not found');
    } else {
      const teacher = await db.user.findOne({
        where: { user_id: teacherId },
      });
      cls.dataValues.firstname = teacher.firstname;
      cls.dataValues.lastname = teacher.lastname;
      cls.dataValues.bio = teacher.bio;
      res.json(cls);
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
      where: { user_id: req.user_id },
    });
    if (!classIds) res.json('Go sign up for a class now!');
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
      res.json('Record not found');
    } else {
      if (cls.paid === true) res.send('You paid');
      else cls.paid = true;
      await cls.save();
    }
    res.json(cls);
    res.status(200);
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    res.status(500);
    res.json(error);
  }
};

exports.updateClass = async (req, res) => {
  try {
    const editedCls = {
      ...req.body,
    };
    const cls = await db.class.findOne({
      where: { class_id: req.params.classid },
    });
    if (!cls) {
      res.status(404);
      res.json('Record not found');
    } else {
      cls.classname = editedCls.classname;
      cls.classtime = editedCls.classtime;
      cls.classlength = editedCls.classlength;
      cls.place_id = editedCls.place_id;
      cls.address = editedCls.address;
      cls.limit = editedCls.limit;
      cls.cost = editedCls.cost;
      cls.description = editedCls.description;
      await cls.save();
    }
    res.json(cls);
    res.status(200);
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    res.status(500);
    res.json(error);
  }
};
