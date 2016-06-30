
const Shout = require('../app/models/shout');

module.exports = (io, socket, console) => {

    socket.on('req shouts', (data) => {
        data = data || { limit: 10 };
        var limit = data.limit || 10;
        console('Shouts requested.');
        Shout
            .find({ })
            .sort({ date: -1 })
            .limit( limit )
            .exec( (err, shouts) => {
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