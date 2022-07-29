const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const AuthController = require('../../controllers/auth');

router.get('/', auth, AuthController.Index);
router.post('/', AuthController.Login);

module.exports = router;
