var supertest = require('supertest');
var app       = require('../../app');

describe('Shoutbox API', function(){

    it('getting shouts is successfully', function(done){
        supertest(app)
            .get('/shouts')
            .expect(200)
            .end(done);
    });

    it('creating new shout is successfully', function(done){
        supertest(app)
            .post('/shouts')
            .send({ author: 'Micha', msg: 'Sample shout text.' })
            .expect(201)
            .end(done);
    });
});
