// require('dotenv').config();
// require('../../lib/utils/connect')();
// const request = require('supertest');
// const app = require('../../lib/app');
// const mongoose = require('mongoose');
// const Actor = require('../../lib/models/Actor');
// const Studio = require('../../lib/models/Studio');
// const Film = require('../../lib/models/Film');

// describe('test films methods', () => {
//     beforeEach(done => {
//         return mongoose.connection.dropDatabase(() => {
//             done();
//         });
//     });
//     afterAll((done) => {
//         mongoose.connection.close(done);
//     });

// it('can post a new film', () => {
//     return Actor.create({
//         name: 'BEST Actor',
//         dob: '10/10/2020',
//         pob: 'USA'       
//     })
//         .then(actor => {
//             return Studio.create({
//                 name: 'BEST STUDIO',
//                 address: {
//                     city: 'PDX',
//                     state: 'OR',
//                     country: 'USA',
//                 }
//             })
//                 .then(studio => {
//                     return request(app)
//                         .post('/films')
//                         .send({
//                             title:'BEST FILM', 
//                             studio: studio._id,
//                             released: 2018,
//                             cast:[{
//                                 role:'LEAD',
//                                 actor: actor._id
//                             }]
//                         });
//                 })
//                 .then(res => {
//                     expect(res.body.title).toContain('BEST FILM');
//                 });
//         });
// });
//next it block
// });