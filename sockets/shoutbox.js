
export default (io, socket, console) => {

    socket.on('req shouts', () => {
        console('Shouts requested.');
        socket.emit('snd shouts', []);
    });

    socket.on('snd shout', (data) => {
        console('Shout received.');
        io.emit('rcv shout', data)
    });

};