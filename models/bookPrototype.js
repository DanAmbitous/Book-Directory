const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  title: String,
  summary: String,
  author: String
})

module.exports = mongoose.model('bookSchema', bookSchema)