const mongoose = require("mongoose");
const Book =  require("./BookSchema")
const Publisher = require('./PublisherSchema')

const AuthorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  books: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "book",
      },
      name: {
        type: String,
        ref: "book",
        required: true,
      },
    },
  ],

  publications: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "publisher",
      },
      name: {
        type: String,
        ref: "publisher",
        required: true,
      },
    },
  ],

  description: String,
});

module.exports = mongoose.model("author", AuthorSchema);
