
// NPM dependencies
var app   = require('../app');
var debug = require('debug')('shoutbox');
var http  = require('http');

debug('Starting the backend ...');

// Determine port
var port = process.env.PORT || '3000';
app.set('port', port);

// Create and start the server
var server = http.createServer(app);
server.listen(port);
server.on('listening', onListening);

function onListening() {
    var addr = server.address();
    debug('Listening on port ' + addr.port);
}
