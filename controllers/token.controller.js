const UserToken = require('../models/UserToken.model');
const keyConstants = require('../constants/keyConstants');


exports.validateUserToken = function(req, callback) {

    let accessToken = req.headers[keyConstants.key_access_token];
    let isValid = false;
    let userID = '';


    let query = UserToken.findOne({});
    query.where({access_token: accessToken});
    query.exec(function(err, result){

        console.log("validateUserToken:", result);

        if(err) {
            console.log('GET ACCESS_TOKEN:' + err);
        }

        if(result == null) {
            isValid = false;
            userID = null;
        } else {
            usreID = result.user_id;
            isValid = true;
        }

        callback({
            user_id: usreID,
            valid: isValid
        });
    });
};

exports.createAccessToken = function(userId, callBack) {

    let token = jwt.sign({ user_id: userId }, 'com.bathem');
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

exports.getAccessToken = function (userId, callBack) {

    let query = UserToken.findOne({});
    query.where({user_id: userId});
    query.exec(function(err, token){
        if(err) {
            console.log('GET ACCESS_TOKEN:' + err);
        }
        callBack(token.access_token, err);
    });
};


