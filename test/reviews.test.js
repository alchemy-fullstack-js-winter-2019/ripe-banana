require('dotenv').config();
require('../lib/utils/connect')();
const request = require('supertest');
const app = require('../lib/app');
const mongoose = require('mongoose');

const createReview = (review) => {
    return request(app)
        .post('/reviews')
        .send({
            review: review
        })
        .then(res => res.body);
};

describe('reviews', () => {
    beforeEach(done => {
        return mongoose.connection.dropDatabase(() => {
            done();
        });
    });
    afterAll(done => {
        mongoose.connection.close(done);
    }); 
    it('creates a review', () => {
        return request(app)
            .post('/reviews')
            .send({
                review: 'good movie',
                rating: 4
            })
            .then(res => {
                expect(res.body).toEqual({
                    review: 'good movie',
                    rating: 4,
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                    _id: expect.any(String),
                    __v: 0
                });
            });
    });
    it('can get all the reviews', () => {
        const reviews = ['review1', 'review2', 'review3'];
        return Promise.all(reviews.map(createReview))
            .then(() => {
                return request(app)
                    .get('/reviews');
            })
            .then(res => {
                expect(res.text).toContain('review2');
            });
    });
});
