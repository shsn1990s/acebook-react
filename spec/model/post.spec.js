const mongoose = require('mongoose');
const Post = require('../../models/post');
const PostsController = require('../../controllers/posts');
// const config = require('config');
// const db = config.get('mongoURI');

require('../mongodb_helper');

describe('Posts Model', () => {
  // beforeEach((done) => {
  //   mongoose.connection.collections.posts.drop(() => {
  //     done();
  //   });
  // });
  it('contains a message', (done) => {
    // mongoose.connect(
    //   'mongodb+srv://react123:React12300@acebook-react.p2avh.mongodb.net/?retryWrites=true&w=majority'
    // );
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
