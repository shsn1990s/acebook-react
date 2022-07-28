const User = require('../models/user');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const UsersController = {
  Index: (req, res) => {
    res.send('Get Route.');
  },

  Create: async (req, res) => {
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists.' }] });
      }
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      // bcrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
      res.send('User has registered.');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error.');
    }
  },
};

module.exports = UsersController;
