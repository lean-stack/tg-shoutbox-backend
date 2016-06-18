var supertest = require('supertest');
var app       = require('../../app');

describe('Homepage', function(){
    it('should return successfully', function(done){
        supertest(app)
            .get('/')
            .expect(200)
            .end(done);
    })
});
