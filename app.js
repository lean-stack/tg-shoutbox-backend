
// NPM dependencies
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

// Setup mongoose
require('./models/db');

// Setup app
var app = express();
app.use( cors());
app.use( bodyParser.json());

// Homepage and assets
app.use('/', express.static(__dirname + '/public'));
// Shoutbox API
app.use('/shouts', require('./routes/shouts'));

module.exports = app;
