// /* eslint-disable no-console */
// require ('dotenv').config();
// require('../../lib/utils/connect')();
// const mongoose = require('mongoose');
// const request = require('supertest');
// const app = require('../../lib/app');
// const Film = require('../../lib/models/Film');
// const { Types } = require('mongoose');

// describe('film app', () => {
//   const createFilm = ((title, studio, released, cast) => {
//     return Film.create({ title, studio, released, cast })
//       .then(film => ({ ...film, _id: film._id.toString() }));
//   });
//   beforeEach(done => {
//     return mongoose.connection.dropDatabase(() => {
//       done();
//     });
//   });

//   it('creates a new film', () => {
//     return createFilm('Castaway', 'warner', Date.now(), { role: 'lead', actor: 'Tom Hanks' })
//       .then(() => {
//         return request(app)
//           .post('/films')
//           .send({
//             title: 'Castaway',
//             studio: 'warner',
//             released: Date.now(),
//             cast: { 
//               role: 'lead',
//               actor: 'Tom Hanks'
//             }
//           })
//           .then(res  => {
//             console.log('res', res.body);
//             expect(res.body).toEqual({
//               title: 'Castaway',
//               studio: 'warner',
//               released: expect.any(String),
//               cast: { 
//                 role: expect.any(String),
//                 actor: 'Tom Hanks'
//               },
//               _id: expect.any(Types.ObjectID),
//               __v: 0
//             });
//           });

//       });
//   });
// });
