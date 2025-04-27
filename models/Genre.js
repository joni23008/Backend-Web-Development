// models/Genre.js
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  id:   { type: Number, required: true, unique: true },
  name: { type: String, required: true }
}, {
  collection: 'genres'
});

module.exports = mongoose.model('Genre', genreSchema);
