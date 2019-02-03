require('dotenv').config();
require('../lib/utils/connect')();
const request = require('supertest');
const app = require('../lib/app');
const mongoose = require('mongoose');

const createActor = (name) => {
    return request(app) 
        .post('/actors')
        .send({
            name: name,
            dob: '1980-4-20',
            pob: 'Paris, France'
        })
        .then(res => res.body);
};

const helen = ({
    name: 'Helen Miran',
    dob: new Date('1480, 8, 2').toJSON(),
    pob: 'England'
});

describe('actors', () => {
    beforeEach(done => {
        return mongoose.connection.dropDatabase(() => {
            done();
        });
    });
    it('creates an actor', () => {
        return request(app)
            .post('/actors')
            .send(helen)
            .then(res => {
                expect(res.body).toEqual({
                    ...helen,
                    _id: expect.any(String),
                    __v: 0
                });
            });
    });
    it('gets all the actors', () => {
        const actors = ['actor1', 'actor2', 'actor3'];
        return Promise.all(actors.map(createActor))
            .then(() => {
                return request(app)
                    .get('/actors');
            })
            .then(({ body }) => {
                expect(body).toHaveLength(3);
            });
    });
});
