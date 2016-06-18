
// NPM dependencies
var express = require('express');

var app = express();

// Homepage and assets
app.use('/', express.static(__dirname + '/public'));
// Shoutbox API
app.use('/shouts', require('./routes/shouts'));

module.exports = app;
