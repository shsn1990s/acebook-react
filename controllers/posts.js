const Post = require('../models/post');
const User = require('../models/user');
//const Profile = require('../models/profile');

const PostsController = {
  Index: async (req, res) => {
    try {
      const posts = await Post.find()
        .sort({ date: -1 })
        .populate('user', ['name', 'avatar']);
      res.send(posts);
    } catch (err) {
      console.message(err.message);
      res.send(500).send('Server Errror');
    }
  },
  Create: async (req, res) => {
    try {
      // const user = await User.findById({ user: req.user.id }).select(
      //   '-password'
      // );
      // console.log('!!!!');
      // console.log(req);
      const post = new Post({
        user: req.user.id,
        title: req.body.title,
        message: req.body.message,
      });
      await post.save((err) => {
        if (err) {
          throw err;
        }
      });
      res.send(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
  User: async (req, res) => {
    try {
      const post = await Post.find({ user: req.params.user_id })
        .sort({ date: -1 })
        .populate('user', ['name', 'avatar']);

      if (!post) {
        return res.status(404).send({ msg: 'Post not found.' });
      }
      res.send(post);
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).send({ msg: 'Post not found.' });
      }
      res.status(500).send('Server Error');
    }
  },
  Delete: async (req, res) => {
    try {
      const post = await Post.findById(req.params.post_id);
      if (!post) {
        return res.status(404).send({ msg: 'Post not found.' });
      }

      // Check if user is original author
      if (post.user.toString() !== req.user.id) {
        return res
          .status(401)
          .send({ msg: 'You are not authorised to delete this post' });
      }
      await post.remove();
      res.json({ msg: 'Post has been removed.' });
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).send({ msg: 'Post not found.' });
      }
      res.status(500).send('Server Error');
    }
  },
  Like: async (req, res) => {
    try {
      const post = await Post.findById(req.params.post_id);

      // Check if user already liked
      if (
        post.likes.filter((like) => like.user.toString() === req.user.id)
          .length > 0
      ) {
        return res.status(400).json({ msg: 'Post Already Liked.' });
      }
      post.likes.unshift({ user: req.user.id });
      await post.save();
      res.json(post.likes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
  Unlike: async (req, res) => {
    try {
      const post = await Post.findById(req.params.post_id);

      if (
        post.likes.filter((like) => like.user.toString() === req.user.id)
          .length === 0
      ) {
        return res.status(400).json({ msg: 'Post has not been liked.' });
      }

      // Get Index of Like
      const remove = post.likes
        .map((like) => like.user.toString())
        .indexOf(req.user.id);

      post.likes.splice(remove, 1);

      await post.save();

      res.json({ msg: 'Like has been removed.' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
  AddComment: async (req, res) => {
    try {
      const post = await Post.findById(req.params.post_id);
      const comment = {
        user: req.user.id,
        comment: req.body.comment,
      };

      post.comments.unshift(comment);
      await post.save();
      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
  DeleteComment: async (req, res) => {
    try {
      const post = await Post.findById(req.params.post_id);

      // Pull out comment - returns true or false
      const comment = post.comments.find(
        (comment) => comment.id === req.params.comment_id
      );

      if (!comment) {
        return res.status(404).json({ msg: 'Comment does not exist' });
      }

      // Check if author of comment
      if (comment.user.toString() !== req.user.id) {
        return res
          .status(401)
          .json({ msg: 'You are not authorised to delete this comment.' });
      }

      // Get Index of Comment
      const remove = post.comments
        .map((comment) => comment.user.toString())
        .indexOf(req.user.id);

      post.comments.splice(remove, 1);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
};

module.exports = PostsController;
