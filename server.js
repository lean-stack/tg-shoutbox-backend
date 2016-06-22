
// Server startup file

// NPM dependencies
import socketio from 'socket.io';
import express from 'express';

// Modules
import http from 'http';

// Creating the Express app, the Node server and integrate Socket.io
let app = express();
let server = http.createServer(app);
let io = socketio(server);
