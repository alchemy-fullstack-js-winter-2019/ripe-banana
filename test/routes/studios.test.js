require('dotenv').config();
require('../../lib/utils/connect')();
const request = require('supertest');
const app = require('../../lib/app');
const mongoose = require('mongoose');
const Studio = require('../../lib/models/Studio');


const createStudio = (name, address = {
    city: 'PDX',
    state: 'OR',
    country: 'USA'
}) => {
    return Studio.create({ name, address })
        .then(createdStudio => {
            return createdStudio;
        });
};

describe('test studio routes', () => {
    beforeEach(done => {
        return mongoose.connection.dropDatabase(() => {
            done();
        });
    });
    afterAll((done) => {
        mongoose.connection.close(done);
    });

    it('can post a new studio', () => {
        return request(app)
            .post('/studios')
            .send({
                name: 'BEST STUDIO',
                address: {
                    city: 'PDX',
                    state: 'OR',
                    country: 'USA',
                }
            })
            .then(res => {
                expect(res.text).toContain('BEST STUDIO');
            });
    });
    it('can get all studios', () => {
        const toCreate = ['STUDIO1', 'STUDIO2', 'STUDIO3'];
        return Promise.all(toCreate.map(createStudio))
            .then(() => {
                return request(app)
                    .get('/studios');
            })
            .then(res => expect(res.body).toHaveLength(3));
    });
    it('can get a studio by ID', () => {
        return createStudio('DANKNASTY')
            .then(createdStudio => {
                return request(app)
                    .get(`/studios/${createdStudio._id}`);
            })
            .then(res => expect(res.body.name).toContain('DANKNASTY'));
    });
    it('can delete a studio', () => {
        return createStudio('BEST EVER')
            .then(createdStudio => {
                return request(app)
                    .delete(`/studios/${createdStudio._id}`);
            })
            .then(res => expect(res.body).toEqual({ deleted: true }));
    });


});