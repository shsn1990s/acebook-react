const Profile = require('../models/profile');
const User = require('../models/user');
const { validationResult } = require('express-validator');

const ProfileController = {
  Index: async (req, res) => {
    // Creates a Profile
    //Check for Express Validation Check Errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { location, status, bio } = req.body;

    const profileFields = {};

    // Get the user ID from the token
    profileFields.user = req.user.id;
    // Location and status should exist
    // bio will be saved if provided.

    profileFields.location = location;
    profileFields.status = status;
    if (bio) profileFields.bio = bio;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        //Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }

      // Create

      profile = new Profile(profileFields);
      await profile.save();
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error.');
    }
  },

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

  All: async (req, res) => {
    try {
      const profiles = await Profile.find().populate('user', [
        'name',
        'avatar',
      ]);
      res.json(profiles);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
  User: async (req, res) => {
    try {
      const profile = await Profile.findOne({
        user: req.params.user_id,
      }).populate('user', ['name', 'avatar']);

      if (!profile) {
        return res
          .status(400)
          .send({ msg: 'A profile does not exist for this user.' });
      }
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      if (err.kind == 'ObjectId') {
        return res
          .status(400)
          .send({ msg: 'A profile does not exist for this user.' });
      }
      res.status(500).send('Server Error');
    }
  },
  Delete: async (req, res) => {
    try {
      await Profile.findOneAndRemove({ user: req.user.id });
      await User.findOneAndRemove({ _id: req.user.id });
      res.json('User has been deleted.');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
};

module.exports = ProfileController;
