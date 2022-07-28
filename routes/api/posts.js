const express = require('express');
const router = express.Router();

const PostsController = require('../../controllers/posts');

// router.get('/', (req, res) => {
//   res.send('Post Route.');
// });

router.get('/', PostsController.Index);
router.post('/', PostsController.Create);

module.exports = router;
