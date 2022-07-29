const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  location: {
    type: String,
  },
  status: {
    type: String,
  },
  bio: {
    type: String,
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
