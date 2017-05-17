const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: String,
    password: String
});


//middleware
UserSchema.pre('save', function(next) {

    //capitalize first char of username
    //this.username.charAt(0).toLocaleUpperCase() + this.username.slice(1);
    next();
});

module.exports = mongoose.model('User', UserSchema);