const express = require('express');
const ProfileController = require('../../controllers/profile');
const router = express.Router();
const auth = require('../../middleware/auth');

router.get('/me', auth, ProfileController.Me);

module.exports = router;
