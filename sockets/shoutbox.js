
import Shout from '../app/models/shout';

export default (io, socket, console) => {

    socket.on('req shouts', () => {
        console('Shouts requested.');
        Shout.find({ }, (err, shouts) => {
            socket.emit('snd shouts', { shouts: shouts });
        });

    });

    socket.on('snd shout', (data) => {
        console('Shout received.');
        var shout = new Shout(data);
        shout.save((err,shout) => {
            if (err) {
                socket.emit('bad shout', err);
                return;
            }
            io.emit('rcv shout', shout)
        });
    });
};