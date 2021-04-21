const mongoose = require("mongoose");
const Book = require("./BookSchema");
const Author = require("./AuthorSchema")

const PublisherSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  writer: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "author",
      },
      name: {
        type: String,
        ref: "author",
        required: true,
      },
    },
  ],

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

  description: String,
});

module.exports = mongoose.model("publisher", PublisherSchema);
