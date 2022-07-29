const Profile = require('../models/profile');
const User = require('../models/user');

const ProfileController = {
  Me: async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id }).populate(
        'user',
        ['name', 'avatar']
      );
      if (!profile) {
        return res
          .status(400)
          .json({ msg: 'There is no profile for this user.' });
      }
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).status('Server Error.');
    }
  },
};

module.exports = ProfileController;
