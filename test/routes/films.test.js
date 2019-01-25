require('dotenv').config();
require('../../lib/utils/connect')();
const request = require('supertest');
const app = require('../../lib/app');
const mongoose = require('mongoose');
// const Film = require('../../lib/models/Film');
const Studio = require('../../lib/models/Studio');
const Actor = require('../../lib/models/Actor');
// const { Types } = require('mongoose');

// const createStudio = (name, address) => {
//   return request(app)
//     .post('/studios')
//     .send({
//       name,
//       address
//     })
//     .then(res => res.body);
// };

// const createStudio = (name = 'BANANA STUDIOS', address = {
//   city: 'portland',
//   state: 'OR',
//   country: 'USA'
// }) => {
//   return Studio.create({ name, address })
//     .then(createdStudio => {
//       return createdStudio;
//     });
// };

// const createActor = (
//   name = 'Banana-jama', 
//   dob = Date.now(),
//   pob = 'Alchemy Code Lab elevator'
// ) => {
//   return Actor.create({ name, dob, pob })
//     .then(createdActor => {
//       return createdActor;
//     });
// };

// const createFilm = (title, released, role) => {
//   return createStudio('Warner', '123')
//     .then(studio => {
//       return createActor('CariPizzaNana', 1994, 'Florida')
//         .then(actor => {
//           console.log('studio', studio);
//           // console.log('actor', actor);
//           return Film.create({
//             title,
//             studio: studio._id,
//             released: 1203,
//             cast: {
//               role,
//               actor: actor._id
//             }
//           })
//             .then(film => ({
//               ...film,
//               _id: film._id.toString()
//             }));
//         });
//     });
// };

describe('film routes', () => {
  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });

  it('creates a film', () => {
    return Studio.create({ name: 'studioName', address: '123' })
      .then(studio => {
        return Actor.create({ name: 'actor name', dob: '1888-10-03', pob: 'Wisconsin' })
          .then(actor => {
            return request(app)
              .post('/films')
              .send({ title: 'Rock of Bananas', studio: studio._id, released: 1885, cast: [{ role: 'Banana Interest', actor: actor._id }] })
              .then(res => {
                expect(res.body).toEqual({ __v: 0,
                  _id: expect.any(String),
                  cast: 
                  [{ _id: expect.any(String),
                    actor: expect.any(String),
                    role: 'Banana Interest'
                  }], released: 1885, studio: expect.any(String), title: 'Rock of Bananas' });
              });
          });
      });
  });

  afterAll((done) => {
    mongoose.disconnect(done);
  });
});


