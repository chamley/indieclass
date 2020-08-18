const db = require('../Models/index')

// CLASSES - TEACHER
// Create class
// Creates a new database entry in classes table, and in the teacher-class binding table
exports.createClass = async (req, res) => {
  try {
    const cat = await db.category.findAll({
      where: {
        category_name: req.body.category
      }
    });
    const teacher = await db.teacher.findByPk(req.body.teacher) // Will eventually come through JWT or session info;
    const classEntry = {
      ...req.body,
      category: cat.category_id,
      teacher_id: teacher.teacher_id
    }
    console.log('the class entry', classEntry)
    const cls = await db.class.create(classEntry);
    console.log('return from create class', cls);
    console.log('create a new class');
    res.send(cls);
    res.status(201);
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    res.status(500);
    res.json(error);
  }
}

// Delete Class
// Removes a new database entry in classes table, and in the teacher-class binding table
exports.deleteClass = async (req, res) => {
  try {
    console.log('delete a class');
    res.send("Class deleted")
    res.status(204);
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    res.status(500);
    res.json(error);
  }
}

// Get Classes
// Looks up all class ID's in the teacher-class binding table that relate to the teacher ID, and then returns the class entries from the class table for relating the the class IDs
exports.getClasses = async (req, res) => {
  try {
    const classes = await db.class.findAll();
    console.log('getting all class');
    res.send(classes);
    res.status(200);
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    res.status(500);
    res.json(error);
  }
}


// setTimeout(()=>{
//   db.category.create({
//    category_name: "Dance"
//   });
//   db.category.create({
//     category_name: "Health"
//   });
//   db.category.create({
//     category_name: "Cooking"
//   });
//   db.category.create({
//     category_name: "Meetup"
//   });
// }, 2000)
// CLASSES - STUDENT