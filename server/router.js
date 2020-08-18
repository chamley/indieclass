const router = require('express').Router();
const classesController = require('./controllers/classes');
const studentsController = require('./controllers/students');
const teachersController = require('./controllers/teachers');
// CLASSES - TEACHER
// Create class
router.post('/classes', classesController.createClass);

// Delete Class
router.delete('/classes', classesController.deleteClass);

// Get Classes
router.get('/classes', classesController.getClasses);

// TODO: Dealing with unfound pages
router.get('/students', studentsController.getStudents);

router.post('/students', studentsController.createStudent);

router.get('/teachers', teachersController.getTeachers);

router.post('/teachers', teachersController.createTeacher);

module.exports = router;
