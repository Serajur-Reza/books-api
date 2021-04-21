const express = require('express')
const auth = require('../auth/auth')
const isAdmin = require('../auth/isAdmin')
const { signup, login } = require("../Middleware/Admins");

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get("/nothing", auth, isAdmin);

module.exports = router