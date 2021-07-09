const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true
  },
  summary: String,
  author: String,
  tag: String,
  image: {
    type: String,
    default: 'https://i.postimg.cc/7Zxxvp8G/Screenshot-2021-06-01-224838.jpg'
  },
  imageType: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('bookSchema', bookSchema)