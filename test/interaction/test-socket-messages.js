
// Hook babel for the ES6 server
require('babel-register');
var server = require('../../server').default;

// Socket.io client
var io = require('socket.io-client');
var options = {
    transports: ['websocket'],
    'force new connection': true
};

describe('Client accessing Sockets API', function () {

    it('should be able to connect', function (done) {

        var client = io.connect('http://localhost:' + server.address().port, options);

        client.once('connect', function () {
            client.disconnect();
            done();
        });
    });

    it('should receive shouts when requested', function (done) {

        var client = io.connect('http://localhost:' + server.address().port, options);

        client.once('connect', function () {
            client.once("snd shouts", function () {
                client.disconnect();
                done();
            });

            client.emit("req shouts", "Hello World");
        });
    });

    it('should receive shout when new shout pushed', function (done) {

        var client = io.connect('http://localhost:' + server.address().port, options);

        client.once('connect', function () {
            client.once("rcv shout", function () {
                client.disconnect();
                done();
            });

            client.emit("snd shout", {});
        });
    });

    it('second client should also receive new pushed shout', function (done) {

        var client = io.connect('http://localhost:' + server.address().port, options);
        var second;

        client.once('connect', function () {

            second = io.connect('http://localhost:' + server.address().port, options);
            second.once('connect', function () {
                second.once("rcv shout", function () {
                    client.disconnect();
                    second.disconnect();
                    done();
                });
                client.emit("snd shout", {});
            });
        });
    });

});
