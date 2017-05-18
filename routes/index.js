const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

//ROUTE: Home page
//router.get('/', asyncController.homePage);
//router.post('/login', userController.noteByMember);

router.get('/', function(req, res){
   res.send('Every thing is ok!');
});

router.post('/signup', userController.createUser);
router.post('/login', userController.login);

//USER
router.get('/users', userController.getUsers);
router.get('/user/:user_id', userController.getUser);


module.exports = router;
