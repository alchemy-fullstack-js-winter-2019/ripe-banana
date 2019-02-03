// require('dotenv').config();
// require('../../lib/utils/connect')();
// const mongoose = require('mongoose');
// const { Types } = require('mongoose');
// const Film = require('../../lib/models/Film');


// describe('film model', () => {
//   beforeEach(done => mongoose.connection.dropDatabase(done));

//   afterAll(() => mongoose.disconnect());

//   it('validates film model', () => {
//     const film = new Film ({
//       title: 'Castaway',
//       studio: 'warner',
//       released: 2000,
//       cast: [{ 
//         role: 'main actor',
//         actor: 'Tom Hanks'
//       }],
//     });
//     const newFilm = new Film(film);
//     const jsonFilm = newFilm.toJSON();
//     expect(jsonFilm).toEqual({
//       title: 'Castaway',
//       studio: 'warner',
//       released: 2000,
//       cast: [{ 
//         _id: expect.any(Types.ObjectId),
//         role: 'main actor',
//         actor: expect.any(Types.ObjectId)
//       }],
//     });
//   });
// });
