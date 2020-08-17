const router = require('express').Router();
const classesController = require('./controllers/classes');

// CLASSES - TEACHER
// Create class
router.post('/classes', classesController.createClass);

// Delete Class
router.delete('/classes', classesController.deleteClass);

// Get Classes
router.get('/classes', classesController.getClasses);

// TODO: Dealing with unfound pages

module.exports = router;