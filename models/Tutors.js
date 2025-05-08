const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema({
  name: String,
  subject: String,
  image: String,
  rate: Number,
  bio: String,
  availableTimes: [String]
});

module.exports = mongoose.model('Tutor', tutorSchema);
