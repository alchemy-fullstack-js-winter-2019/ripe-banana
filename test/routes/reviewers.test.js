require('dotenv').config();
require('../../lib/utils/connect')();
const request = require('supertest');
const app = require('../../lib/app');
const mongoose = require('mongoose');
const Reviewer = require('../../lib/models/Reviewer');


const createReviewer = (name, company = {
    name,
    company: 'ACL'
}) => {
    return Reviewer.create({ name, company })
        .then(createdReviewer => {
            return createdReviewer;
        });
};

describe('test Reviewer routes', () => {
    beforeEach(done => {
        return mongoose.connection.dropDatabase(() => {
            done();
        });
    });
    afterAll((done) => {
        mongoose.connection.close(done);
    });

    it('can post a new Reviewer', () => {
        return request(app)
            .post('/reviewers')
            .send({
                name: 'BEST Reviewer',
                company: 'ACL'       
            })
            .then(res => {
                expect(res.text).toContain('BEST Reviewer');
            });
    });
    it('can get all Reviewers', () => {
        const toCreate = ['Reviewer1', 'Reviewer2', 'Reviewer3'];
        return Promise.all(toCreate.map(createReviewer))
            .then(() => {
                return request(app)
                    .get('/reviewers');
            })
            .then(res => expect(res.body).toHaveLength(3));
    });
    it('can get a Reviewer by ID', () => {
        return createReviewer('DANKNASTY')
            .then(createdReviewer => {
                return request(app)
                    .get(`/reviewers/${createdReviewer._id}`);
            })
            .then(res => expect(res.body.name).toContain('DANKNASTY'));
    });
    it('can update an Reviewer', () => {
        return createReviewer('LANCEBABY')
            .then(createdReviewer => {
                return request(app)
                    .patch(`/reviewers/${createdReviewer._id}`)
                    .send({ name: 'LANCEUPDATED' });
            })
            .then(res => {
                expect(res.body.name).toEqual('LANCEUPDATED');
            });
    });
    it('can delete a Reviewer', () => {
        return createReviewer('BEST EVER')
            .then(createdReviewer => {
                return request(app)
                    .delete(`/reviewers/${createdReviewer._id}`);
            })
            .then(res => expect(res.body).toEqual({ deleted: true }));
    });


});