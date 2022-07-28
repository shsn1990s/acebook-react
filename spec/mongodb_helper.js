var mongoose = require('mongoose');
//const config = require('config');
// const db = config.get('mongoURI');

beforeAll(function (done) {
  mongoose.connect('', {});

  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    collection.deleteMany();
  }

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.on('open', function () {
    done();
  });
});

afterAll(function (done) {
  mongoose.connection.close(true, function () {
    done();
  });
});
