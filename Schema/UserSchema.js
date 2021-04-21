const mongoose = require("mongoose")


const AdminSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    unique: true,
    required: true
  },

  password:{
    type: String,
    required: true
  },

  role:{
    type: String,
    default: "user"
  }
})

module.exports = mongoose.model("admin", AdminSchema)