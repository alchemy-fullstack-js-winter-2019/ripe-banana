require('dotenv').config();
require('../lib/utils/connect')();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');

const createStudio = (name = 'Marvel', address = { city: 'Burbank', 
    state: 'Cali', 
    country: 'USA' }) => {
    return request(app)
        .post('/studios')
        .send({
            name,
            address
        })
        .then(res => res.body);
};

describe('studios', () => {
    beforeEach(done => {
        return mongoose.connection.dropDatabase(() => {
            done();
        });
    });

    it('create a studio', () => {
        return request(app)
            .post('/studios')
            .send({
                name: 'Marvel',
                address: { city: 'Burbank', state: 'Cali', country: 'USA' }
            })
            .then(res => {
                expect(res.body).toEqual({
                    name: 'Marvel',
                    address: { city: 'Burbank', state: 'Cali', country: 'USA' },
                    _id: expect.any(String),
                    __v: 0
                });
            });
    });

    it('gets all studios', () => {
        const studiosToCreate = ['Marvel', 'Fox'];
        return Promise.all(studiosToCreate.map(createStudio))
            .then(() => {
                return request(app)
                    .get('/studios');
            })
            .then(({ body }) => {
                expect(body).toHaveLength(2);
            });
    });

    it('gets a studio by id', () => {
        return createStudio('Fox')
            .then(createdStudio => {
                return Promise.all([
                    Promise.resolve(createdStudio._id),
                    request(app)
                        .get(`/studios/${createdStudio._id}`)
                ]);
            })
            .then(([_id, res]) => {
                expect(res.body).toEqual({
                    address: { city: 'Burbank', state: 'Cali', country: 'USA' },
                    name: 'Fox',
                    _id,
                    __v: 0
                });
            });
    });

    it('finds a studio by id and updates it', () => {
        return createStudio('Fox')
            .then(updatedStudio => {
                updatedStudio.name = 'Warner';
                return request(app)
                    .patch(`/studios/${updatedStudio._id}`)
                    .send(updatedStudio);
            })
            .then(res => {
                expect(res.body.name).toContain('Warner');
            });
    });

    it('deletes a studio', () => {
        return createStudio('Fox')
            .then(createdStudio => {
                const id = createdStudio._id;
                return request(app)
                    .delete(`/studios/${id}`)
                    .then(res => {
                        expect(res.body).toEqual({ 'deleted': 1 });
                    });
            });
    });
});
