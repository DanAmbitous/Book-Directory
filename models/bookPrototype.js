const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
  },
  summary: String,
  author: String,
  tag: String,
})

module.exports = mongoose.model("bookSchema", bookSchema)
