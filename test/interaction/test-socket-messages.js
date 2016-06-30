
// Assertion style
var expect = require('chai').expect;

// Set test environment
process.env.NODE_ENV = 'test';

// Hook babel for the ES6 server
require('babel-register');
var server = require('../../server').default;

// Socket.io client
var io = require('socket.io-client');
var options = {
    transports: ['websocket'],
    'force new connection': true
};

var Shout = require('../../app/models/shout').default;

describe('Client interaction with Sockets API', function () {

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

            client.emit("req shouts");
        });
    });

    it('should receive shout when new shout pushed', function (done) {

        var client = io.connect('http://localhost:' + server.address().port, options);

        client.once('connect', function () {
            client.once("rcv shout", function () {
                client.disconnect();
                done();
            });

            client.emit("snd shout", { author: 'Micha', msg: 'First shout.'});
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
                client.emit("snd shout", { author: 'Micha', msg: 'Second shout.'});
            });
        });
    });

});

describe('Shouts interacations', function () {

    before('clear shouts', function(done) {
        Shout.remove({}, function (err) {
            done();
        })
    });

    it('Shout list should initially be an empty array', function (done) {

        var client = io.connect('http://localhost:' + server.address().port, options);

        client.once('connect', function () {
            client.once("snd shouts", function (data) {
                expect(data).to.have.property('shouts');
                expect(data.shouts).to.be.instanceof(Array);
                expect(data.shouts.length).to.equal(0);
                client.disconnect();
                done();
            });

            client.emit("req shouts");
        });
    });

    it('Shout list should contain one shout if first one is pushed', function (done) {

        var client = io.connect('http://localhost:' + server.address().port, options);

        client.once('connect', function () {
            client.once("snd shouts", function (data) {
                expect(data).to.have.property('shouts');
                expect(data.shouts).to.be.instanceof(Array);
                expect(data.shouts.length).to.equal(1);
                client.disconnect();
                done();
            });

            client.emit("snd shout", { author: 'Micha', msg: 'First shout.'});
            client.emit("req shouts");
        });
    });

    it('Shout limit the count of requested shouts if limit is set', function (done) {

        var client = io.connect('http://localhost:' + server.address().port, options);

        client.once('connect', function () {
            client.once("snd shouts", function (data) {
                expect(data).to.have.property('shouts');
                expect(data.shouts).to.be.instanceof(Array);
                expect(data.shouts.length).to.equal(1);
                client.disconnect();
                done();
            });

            client.emit("snd shout", { author: 'Micha', msg: 'Second shout.'});
            client.emit("req shouts", { limit: 1 });
        });
    });

    it('Shout receive ten shouts if no limit is set', function (done) {

        var client = io.connect('http://localhost:' + server.address().port, options);

        client.once('connect', function () {
            client.once("snd shouts", function (data) {
                expect(data).to.have.property('shouts');
                expect(data.shouts).to.be.instanceof(Array);
                expect(data.shouts.length).to.equal(10);
                client.disconnect();
                done();
            });

            for( var i = 0; i < 10; i++ ) {
                client.emit("snd shout", { author: 'Micha', msg: 'Shout Number ' + (i+3) });
            }

            setTimeout(() => {
                client.emit("req shouts");
            }, 1);

        });
    });

});