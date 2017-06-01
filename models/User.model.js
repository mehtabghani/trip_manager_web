const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mongooseHidden = require('mongoose-hidden')();
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

let UserSchema = new Schema({
    user_id: {
        type: String,
        unique: true,
        required: true
    },
    user_name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        hide: true
    },
    created_on: {
        type: Date,
        hide:true,
        default: Date.now
    }
});

UserSchema.plugin(autoIncrement.plugin,
    {
        model: 'User',
        field: 'user_id',
        startAt: 1,
        incrementBy: 1
    });

UserSchema.plugin(mongooseHidden);


//middleware
UserSchema.pre('save', function(next) {

    //capitalize first char of username
    //this.username.charAt(0).toLocaleUpperCase() + this.username.slice(1);
    next();
});

module.exports = mongoose.model('User', UserSchema);