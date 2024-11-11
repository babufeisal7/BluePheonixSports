const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  date: Date,
  category: String,
  content: String,
  image: String,
  author: String,
  authorImage: String,
});

module.exports = mongoose.model('Blog', blogSchema);
