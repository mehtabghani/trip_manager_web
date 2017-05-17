const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

//ROUTE: Home page
//router.get('/', asyncController.homePage);
//router.post('/login', userController.noteByMember);

router.get('/', function(req, res){
   res.send('Every thing is ok!');
});

module.exports = router;
