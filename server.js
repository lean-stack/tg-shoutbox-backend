
// Server startup file

// NPM dependencies
const socketio = require('socket.io');
const express  = require('express');
const debug    = require('debug');

// Console debug logger
let console = debug('shoutbox:backend');

// Modules
const http = require('http');

// Creating the Express app, the Node server and integrate Socket.io
let app = express();
let server = http.createServer(app);
let io = socketio(server);

// Configure the app
app.use('/', express.static(__dirname + '/public'));

// Configure the db
require('./app/models/db');

// Determine the port
let port = process.env.PORT || 8001;

// Starting the server
server.listen(port);
server.on('listening', () => {
    var addr = server.address();
    console('Listening on port ' + addr.port);
});

// Hook the socket messages
const sockets = require('./sockets/base');
sockets(io,console);

// Integrate the Telegram Bot
require('./app/telegram');

module.exports = server;
