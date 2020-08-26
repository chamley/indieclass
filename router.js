const router = require('express').Router();
const classesController = require('./controllers/classes');
const usersController = require('./controllers/users');
const categoryController = require('./controllers/categories');
const authJWT = require('./middleware/auth');
const locationController = require('./controllers/location');

// Create class
router.post(
  '/classes/:token',
  authJWT.userSpecificAuth,
  classesController.createClass
);

router.get('/location/:place_id', locationController.getLatLng);

// Delete Class
router.delete('/classes/:classid', classesController.deleteClass);

// Get Classes
router.get('/classes', classesController.getAllClasses);

//returns an object
router.get('/class/:classid', classesController.getOneClass);

router.put('/class/:classid', classesController.updateClass);

// Get Classes by teacher (returns an array)
router.get(
  '/classes/:token',
  authJWT.userSpecificAuth,
  classesController.getClasses
);

router.get('/class/payment/:classid', classesController.updatePayment);

//get classes by students (returns an array)
router.get(
  '/students/:token',
  authJWT.userSpecificAuth,
  classesController.getClassesByStudent
);

// TODO: Dealing with unfound pages
router.get('/users', usersController.getUsers);

//returns an object
router.get(
  '/user/:token',
  authJWT.userSpecificAuth,
  usersController.getOneUser
);

// router.post('/users', usersController.createUser);

router.post(
  '/assignusertoclass/:token',
  authJWT.userSpecificAuth,
  usersController.assignUserToClass
);

router.post(
  '/teacher/:token',
  authJWT.userSpecificAuth,
  usersController.editBio
);

// returns an array
router.get('/categories/:categoryid', categoryController.getClassesByCategory);

// returns an array
router.get('/categories', categoryController.getAllCategories);

router.get('/me', authJWT.authMiddleware, usersController.profile);

router.post(
  '/payment/:token',
  authJWT.userSpecificAuth,
  usersController.addPayment
);

router.get('/location/:place_id', locationController.getLatLng);

router.post(
  '/editbio/:token',
  authJWT.userSpecificAuth,
  usersController.editBio
);

module.exports = router;
