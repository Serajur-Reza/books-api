const express = require("express");

const {
  getAllPublishers,
  getPublisherById,
  addPublishers,
  editPublishers,
  deletePublishers,
} = require("../Middleware/Publishers");
const auth = require("../auth/auth");
const isAdmin = require("../auth/isAdmin");

const router = express.Router();

router.get("/", auth, isAdmin, getAllPublishers);

router.get("/:id", auth, isAdmin, getPublisherById);

router.post("/create", auth, isAdmin, addPublishers);

router.put("/edit/:id", auth, isAdmin, editPublishers);

router.delete("/delete/:id", auth, isAdmin, deletePublishers);

module.exports = router;
