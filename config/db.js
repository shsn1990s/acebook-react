const mongoose = require('mongoose')
const config = require('config');
const db = config.get('mongoURI')

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("MongoDB Connection Established.")
  }
  catch (err) {
    console.log(err);
  }
}

module.exports = connectDB;