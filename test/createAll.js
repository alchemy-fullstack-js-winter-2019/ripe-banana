// require('dotenv').config();
// const connect = require('../lib/utils/connect');
// const mongoose = require('mongoose');
// const Studio = require('../lib/models/Studio');
// const Film = require('../lib/models/Film');
// const Actor = require('../lib/models/Actor');

// const createStudio = (name, address) => Studio.create({ name, address });

// const createFilm = (title, released, studioId) => Film.create({ title, released, studioId });

// const createActor = (name, dob, pob) => Actor.create({ name, dob, pob });

// const run = () => {
//   connect('mongodb://127.0.0.1:27017/studios');
//   return createStudio('Shaba Productions', '1234 Main St.')
//     .then(studio => {
//       mongoose.disconnect();
//       connect('mongodb://127.0.0.1:27017/films');
//       createFilm('JS The Movie', '1-27-2019', studio._id)
//         .then(film => {
//           mongoose.disconnect();
//           // mongoose.connect('mongodb://127.0.0.1:27017/actors');
//           // createActor('shabz', '7-7-7777', 'what is pob?')
//           //   .then(actor => mongoose.disconnect());
//         });
//     });
// };

// run();
