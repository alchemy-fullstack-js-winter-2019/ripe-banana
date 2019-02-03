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
        const films = ['actor1', 'actor2', 'actor3'];
        return Promise.all(films.map(createFilm))
            .then(() => {
                return request(app)
                    .get('/films');
            })
            .then(({ body }) => {
                expect(body).toHaveLength(3);
            });
    });
//     it('gets an actor by id', () => {
//         return createActor('chris')
//             .then(actor => {
//                 return request(app)
//                     .get(`/films/${actor._id}`)
//                     .then(res => {
//                         expect(res.body).toEqual({
//                             name: 'chris',
//                             _id: expect.any(String),
//                             dob: '1980-04-20T08:00:00.000Z',
//                             pob: 'Paris, France',
//                             __v: 0
//                         });
//                     });
//             });
//         // const movie = { 
//         //     title: 'James Bond', 
//         //     studio: mongoose.Types.ObjectId(),
//         //     released: 1969,
//         //     cast: [{
//         //         part: 'Lead',
//         //         actor: helen._id
//         //     }]
//         // };
//     });
//     it('gets an actor by id and updates', () => {
//         return createActor('Robert')
//             .then(actor => {
//                 actor.name = 'Kate';
//                 return request(app)
//                     .put(`/films/${actor._id}`)
//                     .send(actor);
//             })
//             .then(res => {
//                 expect(res.body).toEqual({
//                     name: 'Kate',
//                     _id: expect.any(String),
//                     dob: '1980-04-20T08:00:00.000Z',
//                     pob: 'Paris, France',
//                     __v: 0
//                 });
//             });
//     });
//     it('deletes an actor', () => {
//         return createActor('Brad')
//             .then(actor => {
//                 const id = actor._id;
//                 return request(app)
//                     .delete(`/films/${id}`);
//             })
//             .then(res => {
//                 expect(res.body).toEqual({ deleted: 1 });
//             });
//     });
});
