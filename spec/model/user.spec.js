const mongoose = require('mongoose');
const User = require('../../models/User');

require('../mongodb_helper');

describe('User Model', () => {
  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      done();
    });
  });
  it('creates a user instance in UserSchema', () => {
    const user = new User({
      name: 'AZ',
      email: 'exampleuser@example.com',
      password: '123456',
    });
    expect(user.email).toEqual('exampleuser@example.com');
  });
});
