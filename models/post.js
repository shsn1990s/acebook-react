const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = mongoose.model('post', PostSchema);
