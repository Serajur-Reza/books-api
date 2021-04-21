const express = require('express')
const {
  getAllBooks,
  getBookById,
  addBooks,
  editBooks,
  deleteBooks,
} = require("../Middleware/Books");
const auth = require("../auth/auth");
const isAdmin = require("../auth/isAdmin");


const router = express.Router()

router.get("/", auth, isAdmin, getAllBooks);

router.get("/:id", auth, isAdmin, getBookById);

router.post("/create", auth, isAdmin, addBooks);

router.put("/edit/:id", auth, isAdmin, editBooks);

router.delete("/delete/:id", auth, isAdmin, deleteBooks);

module.exports = router;