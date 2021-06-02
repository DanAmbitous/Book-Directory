const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  title: String,
  summary: String,
  author: String,
  image: String
})

module.exports = mongoose.model('bookSchema', bookSchema)