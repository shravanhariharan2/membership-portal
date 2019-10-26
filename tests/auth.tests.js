const {server}  = require('../index.js');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let faker = require('faker');

chai.use(chaiHttp);


describe('Test Login Route', () => {
    it('Route should successfully post a login of a user', (done) => {
        let user = {
            email: faker.internet.email(),
            name: faker.name.findName()
        }
        chai.request(server)
            .post('/api/v1/auth/login')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.user.should.have.property('email').eql(user.email);
                res.body.user.should.have.property('name').eql(user.name);
              done();
            });
        });
    });