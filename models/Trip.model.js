const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

let TripSchema = new Schema({

    trip_id: {
        type: String,
        required: true,
        unique: true
    },
    user_id: {
        type: String,
        required: true
    },
    start_lattitude: {
        type: String,
    },
    start_longitude: {
        type: String,
    },
    end_lattitude: {
        type: String,
    },
    end_longitude: {
        type: String,
    },
    start_on: {
        type: Date,
        default: Date.now
    },
    end_on: {
        type: Date,
        default: Date.now
    },
});

TripSchema.plugin(autoIncrement.plugin,
    {
        model: 'Trip',
        field: 'trip_id',
        startAt: 1,
        incrementBy: 1
    });


module.exports = mongoose.model('Trip', TripSchema);