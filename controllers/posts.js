//const Post = require('../models/post');

const PostsController = {
  Index: (req, res) => {
    res.send('Get Route.');
  },
  Create: (req, res) => {
    res.send('Post Route.');
  },
};

module.exports = PostsController;