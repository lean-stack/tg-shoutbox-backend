
export default (io, console) => {

    io.sockets.on('shouts', (socket) => {
        console('Shouts requested');
    });

    io.sockets.on('shout', (socket) => {
        console('Shout pushed');
    });

};