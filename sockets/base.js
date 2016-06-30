
const shoutbox = require('./shoutbox');

module.exports = (io, console) => {

    io.sockets.on('connection', (socket) => {

        console('Client shoutbox connected');

        // wire shoutbox messages
        shoutbox(io, socket, console);

        socket.on('disconnect', () => {
            console('Client shoutbox disconnected');
        });
    });
};
