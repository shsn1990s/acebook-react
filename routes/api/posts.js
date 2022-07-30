const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const PostsController = require('../../controllers/posts');

router.get('/', auth, PostsController.Index);
router.post('/', auth, PostsController.Create);
router.get('/:user_id', auth, PostsController.User);
router.delete('/:post_id', auth, PostsController.Delete);
router.put('/like/:post_id', auth, PostsController.Like);
router.put('/unlike/:post_id', auth, PostsController.Unlike);
router.post('/comment/:post_id', auth, PostsController.AddComment);
router.delete(
  '/comment/:post_id/:comment_id',
  auth,
  PostsController.DeleteComment
);

module.exports = router;
