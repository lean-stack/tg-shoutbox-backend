
import shoutbox from './shoutbox';

export default (io, console) => {

    io.sockets.on('connect', (socket) => {

        console('Client shoutbox connected');
        socket.on('disconnect', () => {
            console('Client shoutbox disconnected');
        });
    });

    shoutbox(io, console);
};
