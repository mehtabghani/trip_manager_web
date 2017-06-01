const express = require('express');
const router = express.Router();


const userController = require('../controllers/user.controller');
const tripController = require('../controllers/trip.controller');
const tokenController = require('../controllers/token.controller');
const constants = require('../constants/constants');
const keyConstants = require('../constants/keyConstants');


let checkAccessToken = function(req, callBack) {
    tokenController.validateUserToken(req, callBack);
};

let checkApiSecret = function(req, res, next) {

    let errorMsg = '';

    if (req.headers[keyConstants.key_api_secret] == null){
        errorMsg = 'Api secret required';
   } else if (req.headers[keyConstants.key_api_secret] === constants.config.api_secret) {
        next();
        return;
    } else
         errorMsg = 'Wrong API secret';

    res.send(errorMsg);

};


//----------------------------------------

// middleware
router.use('/signup', checkApiSecret);
router.use('/login', checkApiSecret);

router.all('*', function (req, res, next) {

   console.log(req.url);
    if (req.url === '/') {
        next();
        return;
    }

    let errorMsg = '';

    if(req.headers[keyConstants.key_access_token] == null) {
        errorMsg = 'Access token required';
        res.json(errorMsg);
        return;
    }

    checkAccessToken(req, function (result) {

        if(result.valid) {
            next();
            return;
        }

        res.json('token invalid');
    })

});

// -------------------------------------------

//ROUTE: Home page
router.get('/', function(req, res){
    res.send('Every thing is ok!');
});

router.post('/login', userController.login);
router.post('/signup', userController.createUser);

//USER
router.get('/users', userController.getUsers);
router.get('/user/:user_id', userController.getUser);

//TRIPS
router.post('/trip', tripController.createTrip);
router.get('/trip/:trip_id', tripController.getTrip);
router.get('/trips/:user_id', tripController.getAllTrips);

module.exports = router;

