const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let UserTokenSchema = new Schema({
    user_id: {
        type: String,
        unique: true,
        required: true
    },

    access_token: {
        type: String,
        required: true,
        unique: true
    },
    expired_on: {
        type: Date,
        default: Date.now
    }
});



//middleware
UserTokenSchema.pre('save', function(next) {

    //capitalize first char of username
    //this.username.charAt(0).toLocaleUpperCase() + this.username.slice(1);
    next();
});

module.exports = mongoose.model('User_Token', UserTokenSchema);