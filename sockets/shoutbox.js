
export default (io, socket, console) => {

    socket.on('req shouts', (socket) => {
        console('Shouts requested.');
        socket.emit('snd shouts', []);
    });

    socket.on('snd shout', (socket) => {
        console('Shout received.');
        io.emit('rcv shout')
    });

};