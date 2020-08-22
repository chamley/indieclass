const router = require('express').Router();
const classesController = require('./controllers/classes');
const usersController = require('./controllers/users');
const categoryController = require('./controllers/categories');
const authMiddleware = require('./middleware/auth');
// Create class
router.post('/classes', classesController.createClass);

// Delete Class
router.delete('/classes/:classid', classesController.deleteClass);

// Get Classes
router.get('/classes', classesController.getAllClasses);

//returns an object
router.get('/class/:classid', classesController.getOneClass);

router.put('/class/:classid', classesController.updateClass);

// Get Classes by teacher (returns an array)
router.get('/classes/:user_id', classesController.getClasses);

router.get('/class/payment/:classid', classesController.updatePayment);
//get classes by students (returns an array)
router.get('/students/:studentid', classesController.getClassesByStudent);

// TODO: Dealing with unfound pages
router.get('/users', usersController.getUsers);

//returns an object
router.get('/user/:userid', usersController.getOneUser);

// router.post('/users', usersController.createUser);

router.post('/assignusertoclass', usersController.assignUserToClass);

router.put('/users/:userid', usersController.upgradeToTeacher);

router.post('/teacher/:userid', usersController.createTeacher);

// returns an array
router.get('/categories/:categoryid', categoryController.getClassesByCategory);

// returns an array
router.get('/categories', categoryController.getAllCategories);

router.get('/me', authMiddleware, usersController.profile);

module.exports = router;
