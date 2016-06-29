
// Server startup file

// NPM dependencies
import socketio from 'socket.io';
import express from 'express';
import debug from 'debug';

// Console debug logger
let console = debug('shoutbox:backend');

// Modules
import http from 'http';

// Creating the Express app, the Node server and integrate Socket.io
let app = express();
let server = http.createServer(app);
let io = socketio(server);

// Configure the app
app.use('/', express.static(__dirname + '/public'));

// Configure the db
import './app/models/db';

// Determine the port
let port = process.env.PORT || 8001;

// Starting the server
server.listen(port);
server.on('listening', () => {
    var addr = server.address();
    console('Listening on port ' + addr.port);
});

// Hook the socket messages
import sockets from './sockets/base';
sockets(io,console);

export default server;
