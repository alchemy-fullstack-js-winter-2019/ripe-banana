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
            dob: '1980-04-20T00:00:00.000Z',
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
    afterAll(done => {
        mongoose.connection.close(done);
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
    it('gets an actor by id', () => {
        return createActor('chris')
            .then(actor => {
                return request(app)
                    .get(`/actors/${actor._id}`)
                    .then(res => {
                        expect(res.body).toEqual({
                            name: 'chris',
                            _id: expect.any(String),
                            dob: '1980-04-20T00:00:00.000Z',
                            pob: 'Paris, France',
                            __v: 0
                        });
                    });
            });
        // const movie = { 
        //     title: 'James Bond', 
        //     studio: mongoose.Types.ObjectId(),
        //     released: 1969,
        //     cast: [{
        //         part: 'Lead',
        //         actor: helen._id
        //     }]
        // };
    });
    it('gets an actor by id and updates', () => {
        return createActor('Robert')
            .then(actor => {
                actor.name = 'Kate';
                return request(app)
                    .put(`/actors/${actor._id}`)
                    .send(actor);
            })
            .then(res => {
                expect(res.body).toEqual({
                    name: 'Kate',
                    _id: expect.any(String),
                    dob: '1980-04-20T00:00:00.000Z',
                    pob: 'Paris, France',
                    __v: 0
                });
            });
    });
    it('deletes an actor', () => {
        return createActor('Brad')
            .then(actor => {
                const id = actor._id;
                return request(app)
                    .delete(`/actors/${id}`);
            })
            .then(res => {
                expect(res.body).toEqual({ deleted: 1 });
            });
    });
});
