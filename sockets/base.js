
const shoutbox = require('./shoutbox');

module.exports = (io, console, tg) => {

    io.sockets.on('connection', (socket) => {

        console('Client shoutbox connected');

        // wire shoutbox messages
        shoutbox(io, socket, tg, console);

        socket.on('disconnect', () => {
            console('Client shoutbox disconnected');
        });
    });
};
