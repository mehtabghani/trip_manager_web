const Trip = require('../models/Trip.model');


let createTrip = function(trip, callback){

    let newTrip = new Trip();
    newTrip.user_id = trip.user_id;
    newTrip.start_lattitude = trip.start_latt;
    newTrip.start_longitude = trip.start_long;
    newTrip.end_lattitude = trip.end_latt;
    newTrip.end_longitude = trip.end_long;
    newTrip.start_on = trip.start_on;
    newTrip.end_on = trip.end_on;


    newTrip.save(function(error, trip){
        callback(trip, error);
    });

};

let getAllTripsByUserId = function (userId, callBack) {

    let query = Trip.find({});
    query.where({user_id: userId});
    query.limit(10);
    query.exec(function(error, trips){
            callBack(trips, error);
        });
};

let getTripById = function (tripId, callBack) {

    let query = Trip.findOne({});
    query.where({trip_id: tripId});
    query.exec(function(error, trip){
        callBack(trip, error);
    });
};

exports.createTrip = function(req, res) {

    let trip = {
        user_id : req.body.user_id,
        start_latt: req.body.start_lattitude,
        start_long: req.body.start_longitude,
        end_latt: req.body.end_lattitude,
        end_long: req.body.end_longitude,
        start_on: req.body.start_on,
        end_on: req.body.end_on
    };

    createTrip(trip, function (trip, error) {

        if(error){
            console.log(error);
            return res.send("Failed to create trip");
        }

        return res.json(trip);
    });
};

exports.getTrip = function(req, res) {

    getTripById(req.params.trip_id, function (trip, error) {
        if(error){
            console.log(error);
            return res.send("Failed to get trip");
        }

        return res.json(trip);

    });
};

exports.getAllTrips = function(req, res) {

    getAllTripsByUserId(req.params.user_id, function (trips, error) {
        if(error){
            console.log(error);
            return res.send("Failed to get trips");
        }

        var data = []
        for(var trip in trips) {

          data.push(trips[trip])
        }

        return res.json(data);
    });
};
