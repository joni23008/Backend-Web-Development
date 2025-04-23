
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
 
  Name: {
    type: String,
    required: true
  },
  Year: {
    type: Number
  },
  category: {
    type: String
  },
  Description: {
    type: String
  }
}, 
{
  collection: 'Movies'
});

module.exports = mongoose.model('Movie', movieSchema);
