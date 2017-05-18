const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const tripController = require('../controllers/trip.controller');

//ROUTE: Home page

router.get('/', function(req, res){
   res.send('Every thing is ok!');
});

router.post('/signup', userController.createUser);
router.post('/login', userController.login);

//USER
router.get('/users', userController.getUsers);
router.get('/user/:user_id', userController.getUser);

//TRIPS
router.post('/trip', tripController.createTrip);
router.get('/trip/:trip_id', tripController.getTrip);
router.get('/trips/:user_id', tripController.getAllTrip);




module.exports = router;
