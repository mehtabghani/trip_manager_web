'use strict';

const User = require('../models/User.model');
const UserToken = require('../models/UserToken.model');
const jwt = require('jsonwebtoken');
const tokenController = require('../controllers/token.controller');


//USERS

let getAllUsers = function (callBack) {

    let query = User.find({});
    query.limit(10);
    query.exec(function(err, users){
        if(err) {
            console.log('GET Users:' + err);
        }
        callBack(users, err);
    });
};

let getUserByNameAndPassword = function (userName, pswd, callBack) {

    let query = User.findOne({});
    query.where({user_name: userName, password:pswd});
    query.exec(function(err, user) {
        if (err) {
            console.log("FIND USER BY NAME:" + err);
        }

        callBack(user, err);
    });
};

let getUserById = function (userID,  callBack) {

    let query = User.findOne({});
    query.where({user_id: userID});
    query.exec(function(err, user) {
        if (err) {
            console.log("FIND USER:" + err);
        }

        callBack(user, err);
    });
};

let createUser = function (newUser, callBack) {

    newUser.save(function(err, user){
             if(err) {
            console.log("SAVE USER:"+err)
        }

        callBack(user, err);

    });

};

// ROUTE HANDLERS
exports.createUser = function(req, res) {

    let newUser = new User();
    newUser.user_name = req.body.user_name;
    newUser.password = req.body.password;
    newUser.created_on = Date.now();
    //newUser.user_id = Math.round(Math.random());

    createUser(newUser, function(user, err){
        if(err) {
            return res.send('Failed to create new user');
        }

        tokenController.createAccessToken(user.user_id,
            function (access_token, error){

                if(error || access_token == 0 || access_token == null)
                    return res.send('Failed to create access token');

                return res.json({
                    msg:'Signup successfull',
                    status:'',
                    access_token: access_token,
                    user_id: user.user_id.toString()
                });
            });
    });

};

exports.login = function(req, res) {

    let userName = req.body.user_name;
    let pswd = req.body.password;

    console.log("User:" + userName);


    getUserByNameAndPassword(userName, pswd, function (user, err) {
        if(err || user == null) {
            console.log("FIND User:" + err);
            return res.send('Failed to login');
        }
        console.log("FIND User:" + user);

        tokenController.getAccessToken(user.user_id, function(accessToken, error){

            console.log("accessToken:"+ accessToken)

            if( error || accessToken == 0 || accessToken == null) {
                return res.send('Failed to login');
            }

            return res.json({
                msg:'login successfull',
                status:'',
                access_token: accessToken,
                user_id: user.user_id.toString()
            });
        });
    });

};

exports.getUsers = function(req, res) {

    getAllUsers(function(users, err){

        if( err || users.size == 0) {
            return res.send('Failed to get users');
        }

        res.json(users);
    });
};

exports.getUser = function(req, res) {

    getUserById(req.params.user_id, function(user, err){

        if( err || user == null) {
            return res.send('Failed to get user');
        }

        res.json(user);
    });
};
