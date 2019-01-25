require('dotenv').config();
require('../../lib/utils/connect')();
const Film = require('../../lib/models/Film');
const request = require('supertest');
const app = require('../../lib/app');
const mongoose = require('mongoose');
const Studio = require('../../lib/models/Studio');
const Actor = require('../../lib/models/Actor');
const { Types } = require('mongoose');

// const createStudio = (name, address) => {
//   return request(app)
//     .post('/studios')
//     .send({
//       name,
//       address
//     })
//     .then(res => res.body);
// };

const createStudio = (name = 'BANANA STUDIOS', address = {
  city: 'portland',
  state: 'OR',
  country: 'USA'
}) => {
  return Studio.create({ name, address })
    .then(createdStudio => {
      return createdStudio;
    });
};

const createActor = (
  name = 'Banana-jama', 
  dob = Date.now(),
  pob = 'Alchemy Code Lab elevator'
) => {
  return Actor.create({ name, dob, pob })
    .then(createdActor => {
      return createdActor;
    });
};

const createFilm = (title, released, role) => {
  return createStudio('Warner')
    .then(studio => {
      return createActor('CariPizzaNana')
        .then(actor => {
          // console.log('studio', studio);
          // console.log('actor', actor);
          return Film.create({
            title,
            studio: studio._id,
            released,
            cast: {
              role,
              actor: actor._id
            }
          });
        });
    });
};

describe('film routes', () => {
  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });

  it('creates a film', () => {
    return createFilm('Rock of Bananas', 1885, 'Banana Interest')
      .then(createdFilm => {
        // console.log('created', createdFilm);
        return request(app)
          .post('/films')
          .send(createdFilm)
          .then(res => {
            // console.log(res.body);
            expect(res.body).toEqual({ _id: expect.any(String),
              title: 'Rock of Bananas',
              studio: expect.any(Types.ObjectId),
              released: 1885,
              cast:
               [{ _id: expect.any(Types.ObjectId),
                 role: 'Banana Interest',
                 actor: expect.any(Types.ObjectId) 
               }],
              __v: 0 });
          });
      });
  });
});


afterAll((done) => {
  mongoose.disconnect(done);
});
