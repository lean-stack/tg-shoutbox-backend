
// Server startup file
require('dotenv').config();

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
-123377754
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

// Get the Telegram Bot
const bot = require('./app/telegram');

// Hook the socket messages
const sockets = require('./sockets/base');
sockets(io,console, bot.tg);


module.exports = server;
