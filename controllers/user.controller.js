'use strict';

const User = require('../models/User.model');
const UserToken = require('../models/UserToken.model');
const jwt = require('jsonwebtoken');

//TOKEN

let createAccessToken = function(userId, callBack) {

    let token = jwt.sign({ user_id: '9' }, 'com.bathem');
    console.log('createAccessToken: ' + token);

    // // verify a token symmetric
    // jwt.verify(token, 'shhhhh', function(err, decoded) {
    //     console.log(decoded.user_id) // bar
    // });

    let newToken = new UserToken();
    newToken.user_id = userId;
    newToken.access_token = token;
    newToken.created_on = Date.now();
    newToken.expired_on = Date.now();

    newToken.save(function (err, token) {
        if(err) {
            console.log('SAVE ACCESS_TOKEN:' + err);
        }
        return callBack(token.access_token, err);
    });
};

let getAccessToken = function (userId, callBack) {

    let query = UserToken.findOne({});
    query.where({user_id: userId});
    query.exec(function(err, token){
        if(err) {
            console.log('GET ACCESS_TOKEN:' + err);
        }
        callBack(token.access_token, err);
    });
};


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

        createAccessToken(user.user_id,
            function (access_token, error){

                if(error || access_token == 0 || access_token == null)
                    return res.send('Failed to create access token');

                return res.json({
                    msg:'Signup successfull',
                    status:'',
                    acces_token: access_token,
                    user_id: user.user_id
                });
            });
    });

};

exports.login = function(req, res) {

    let userName = req.body.user_name;
    let pswd = req.body.password;

    getUserByNameAndPassword(userName, pswd, function (user, err) {
        if(err || user == null) {
            console.log("FIND User:" + err);
            return res.send('Failed to login');
        }

        getAccessToken(user.user_id, function(accessToken, error){

            console.log("accessToken:"+ accessToken)

            if( error || accessToken == 0 || accessToken == null) {
                return res.send('Failed to login');
            }

            return res.json({
                msg:'login successfull',
                status:'',
                access_token: accessToken,
                user_id: user.user_id
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