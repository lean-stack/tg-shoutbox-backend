
var expect = require('chai').expect;

var Shout = require('../../../models/shout');

describe('a shout', function() {
    it('should be invalid if author is empty', function(done) {
        var shout = new Shout()

        shout.validate(function(err) {
            expect(err.errors.author).to.exist;
            done();
        });
    });

    it('should be invalid if msg is empty', function(done) {
        var shout = new Shout()

        shout.validate(function(err) {
            expect(err.errors.msg).to.exist;
            done();
        });
    });

    it('should have a default date if ommitted', function(done) {
        var shout = new Shout()

        shout.validate(function(err) {
            expect(err.errors.date).to.not.exist;
            done();
        });
    });
});
