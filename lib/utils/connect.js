const mongoose = require('mongoose');
const { parse } = require('url');

function redact(uri){
  const parsedUri = parse(uri);
  const authPart = parsedUri.auth ? '****:****@' : '';
  return `${parsedUri.protocol}://${authPart}${parsedUri.host}:${parsedUri.port}${parsedUri.path}`;


}

function log(event, dbUri){
  return function(){
    // eslint-disable-next-line no-console
    console.log(`connection${event} on ${redact(dbUri)}`);
  };
}

module.exports = (dbUri = process.env.MONGODB_URI) => {
  mongoose.connect(dbUri, { useNewUrlParser: true });

  mongoose.connection.on('open', log('open', dbUri));

  mongoose.connection.on('error', log('error', dbUri));

  mongoose.connection.on('close', log('close', dbUri));
};
