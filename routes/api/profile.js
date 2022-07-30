const express = require('express');
const ProfileController = require('../../controllers/profile');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check } = require('express-validator');

router.post(
  '/',
  [
    auth,
    [
      check('location', 'Location is required.').not().isEmpty(),
      check('status', 'Status is required.').not().isEmpty(),
    ],
  ],
  ProfileController.Index
);
router.get('/me', auth, ProfileController.Me);
router.get('/all', ProfileController.All);
router.get('/:user_id', ProfileController.User);
router.delete('/', auth, ProfileController.Delete);

module.exports = router;
