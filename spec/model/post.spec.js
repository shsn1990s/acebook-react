const mongoose = require('mongoose');
const Post = require('../../models/post');
const PostsController = require('../../controllers/posts');

require('../mongodb_helper');

describe('Post Model', () => {
  beforeEach((done) => {
    mongoose.connection.collections.posts.drop(() => {
      done();
    });
  });
  it('creates an instance in PostSchema', () => {
    const post = new Post({
      message: 'Testing',
    });
    expect(post.message).toEqual('Testing');
  });
  it('can save a message', (done) => {
    var message = new Post({
      message: 'Test Message',
    });
    message.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();
        expect(posts[0].message).toEqual('Test Message');
        done();
      });
    });
  });
});
