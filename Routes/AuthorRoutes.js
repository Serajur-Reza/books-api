const express = require('express')

const {
  getAllAuthors,
  getAuthorById,
  addAuthors,
  editAuthors,
  deleteAuthors,
} = require("../Middleware/Authors");

const auth = require("../auth/auth");
const isAdmin = require("../auth/isAdmin");

const router = express.Router();

router.get("/", auth, isAdmin, getAllAuthors);

router.get("/:id", auth, isAdmin,getAuthorById);

router.post("/create", auth, isAdmin , addAuthors);

router.put("/edit/:id", auth, isAdmin, editAuthors);

router.delete("/delete/:id", auth, isAdmin, deleteAuthors);


module.exports = router;