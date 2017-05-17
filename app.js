const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser  = require('body-parser');
const path = require('path');
const routes = require('./routes/index');

const Schema = mongoose.Schema;

var port = 3001;
var dbPort = 27017;
var dbName = "meeting_app";
var dbHost = "127.0.0.1"
var dbURL  = 'mongodb://'+ dbHost+':'+ dbPort +'/'+ dbName;

mongoose.connect(dbURL);

//setup view engine
const swig = require('swig');
app.engine('html', swig.renderFile);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/', routes);


app.listen(port, function () {
    console.log('app listening on port ' + port);
});