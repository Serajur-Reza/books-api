const mongoose = require('mongoose')
const Author = require("./AuthorSchema");

const BookSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  writer:{
    type: String,
    // ref: Author,
    required: true
  },

  publication: {
    type: String,
    required: true
  },

  publishing_date:{
    type: Date,
    default: Date.now()
  },

  description: String
})

module.exports = mongoose.model("book", BookSchema)