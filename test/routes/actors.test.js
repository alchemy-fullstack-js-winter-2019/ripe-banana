require('dotenv').config();
require('../../lib/utils/connect')();
const request = require('supertest');
const app = require('../../lib/app');
const mongoose = require('mongoose');
const Actor = require('../../lib/models/Actor');


const createActor = (name, address = {
    name: 'LANCE',
    dob: '10/10/2020',
    pob: 'USA'
}) => {
    return Actor.create({ name, address })
        .then(createdActor => {
            return createdActor;
        });
};

describe('test Actor routes', () => {
    beforeEach(done => {
        return mongoose.connection.dropDatabase(() => {
            done();
        });
    });
    afterAll((done) => {
        mongoose.connection.close(done);
    });

    it('can post a new Actor', () => {
        return request(app)
            .post('/actors')
            .send({
                name: 'BEST Actor',
                dob: '10/10/2020',
                pob: 'USA'       
            })
            .then(res => {
                expect(res.text).toContain('BEST Actor');
            });
    });
    it('can get all Actors', () => {
        const toCreate = ['Actor1', 'Actor2', 'Actor3'];
        return Promise.all(toCreate.map(createActor))
            .then(() => {
                return request(app)
                    .get('/actors');
            })
            .then(res => expect(res.body).toHaveLength(3));
    });
    it('can get a Actor by ID', () => {
        return createActor('DANKNASTY')
            .then(createdActor => {
                return request(app)
                    .get(`/actors/${createdActor._id}`);
            })
            .then(res => expect(res.body.name).toContain('DANKNASTY'));
    });
    it('can update an actor', () => {
        return createActor('LANCEBABY')
            .then(createdActor => {
                return request(app)
                    .patch(`/actors/${createdActor._id}`)
                    .send({ name: 'LANCEUPDATED' });
            })
            .then(res => {
                expect(res.body.name).toEqual('LANCEUPDATED');
            });
    });
    it('can delete a Actor', () => {
        return createActor('BEST EVER')
            .then(createdActor => {
                return request(app)
                    .delete(`/actors/${createdActor._id}`);
            })
            .then(res => expect(res.body).toEqual({ deleted: true }));
    });


});