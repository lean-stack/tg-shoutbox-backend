
import shoutbox from './shoutbox';

export default (io, console) => {

    io.sockets.on('connection', (socket) => {

        console('Client shoutbox connected');

        // wire shoutbox messages
        shoutbox(io, socket, console);

        socket.on('disconnect', () => {
            console('Client shoutbox disconnected');
        });
    });
};
