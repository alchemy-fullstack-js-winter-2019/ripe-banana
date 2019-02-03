require('dotenv').config();
require('../lib/utils/connect')();
const request = require('supertest');
const app = require('../lib/app');
const mongoose = require('mongoose');

const createFilm = (title = 'Saw', released = 2003) => {
    return createStudio()
        .then(createStudio => {
            return request(app) 
                .post('/films')
                .send({
                    title,
                    released,
                    studio: createStudio._id
                })
                .then(res => res.body);
        });
};

const createStudio = (name = 'Universal', address = { city: 'Los Angeles', state: 'Cali', country: 'USA' }) => {
    return request(app)
        .post('/studios')
        .send({
            name,
            address
        })
        .then(res => res.body);
};
describe('films', () => {
    beforeEach(done => {
        return mongoose.connection.dropDatabase(() => {
            done();
        });
    });
    afterAll(done => {
        mongoose.connection.close(done);
    });
    it('creates an film', () => {
        return createStudio('Universal')
            .then(createStudio => {
                return request(app)
                    .post('/films')
                    .send({
                        title: 'Saw',
                        released: '2003',
                        studio: createStudio._id
                    })
                    .then(res => {
                        expect(res.body).toEqual({
                            title: 'Saw',
                            released: 2003,
                            studio: expect.any(String),
                            cast: [],
                            _id: expect.any(String),
                            __v: 0
                        });
                    });
            });
    });
    it('gets all the films', () => {
        const films = ['Saw', 'Jaws', 'Matrix'];
        return Promise.all(films.map(createFilm))
            .then(() => {
                return request(app)
                    .get('/films');
            })
            .then(({ body }) => {
                expect(body).toHaveLength(3);
            });
    });
    it('gets a film by id', () => {
        return createFilm('Saw')
            .then(film => {
                return Promise.all([
                    Promise.resolve(film._id),
                    request(app)
                        .get(`/films/${film._id}`)
                ]);
            })
            /* eslint-disable-next-line*/
            .then(([_id, res])=> {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    cast: [],
                    released: 2003,
                    studio: expect.any(String),
                    title: 'Saw',
                    __v: 0
                });
            });
    });
    it('gets an film by id and updates', () => {
        return createFilm('Hana')
            .then(film => {
                film.title = 'whatever';
                return request(app)
                    .put(`/films/${film._id}`)
                    .send(film);
            })
            .then(res => {
                expect(res.text).toContain('whatever');
            });
    });
    it('deletes an film', () => {
        return createFilm('Saw')
            .then(film => {
                const id = film._id;
                return request(app)
                    .delete(`/films/${id}`);
            })
            .then(res => {
                expect(res.body).toEqual({ deleted: 1 });
            });
    });
});
