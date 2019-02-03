require('dotenv').config();
require('../lib/utils/connect')();
const request = require('supertest');
const app = require('../lib/app');
const mongoose = require('mongoose');

const createReviewer = (name) => {
    return request(app)
        .post('/reviewers')
        .send({ 
            name: name,
            company: 'company'
        })
        .then(res => res.body);
};

describe('reviewers', () => {
    beforeEach(done => {
        return mongoose.connection.dropDatabase(() => {
            done();
        });
    });
    it('creates a reviewer', () => {
        return request(app)
            .post('/reviewers')
            .send({
                name: 'John',
                company: 'company'
            })
            .then(res => {
                expect(res.body).toEqual({
                    name: 'John',
                    company: 'company',
                    _id: expect.any(String),
                    __v: 0
                });
            });
    });
});

it('gets all reviewers', () => {
    const names = ['john', 'muffin', 'person'];
    return Promise.all(names.map(createReviewer))
        .then(() => {
            return request(app)
                .get('/reviewers');
        })
        .then(({ body }) => {
            expect(body).toHaveLength(4);
        });
});

it('gets a reviewer by id', () => {
    return createReviewer('poppy')
        .then(createdReviewer => {
            return request(app) 
                .get(`/reviewers/${createdReviewer._id}`)
                .then(res => {
                    expect(res.body).toEqual({
                        name: 'poppy',
                        company: 'company',
                        _id: expect.any(String)
                    });
                });
        });
});

it('updates a reviewer and updates', () => {
    return createReviewer('puppy')
        .then(createdReviewer => {
            createdReviewer.name = 'scott';
            return request(app)
                .put(`/reviewers/${createdReviewer._id}`)
                .send(createdReviewer);
        })
        .then(res => {
            expect(res.body).toEqual({
                name: 'scott',
                company: 'company',
                _id: expect.any(String),
                __v: 0
            });
        });
});

afterAll(done => {
    mongoose.connection.close(done);
});
