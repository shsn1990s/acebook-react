const Post = require('../models/post');

const PostsController = {
  Index: (req, res) => {
    res.send('Get Route.');
  },
  Create: (req, res) => {
    const post = new Post(req.body);
    post.save((err) => {
      if (err) {
        throw err;
      }
    });
    res.send('Post Route.');
  },
};

module.exports = PostsController;
