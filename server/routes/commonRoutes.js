const express = require("express");
const { loginUser } = require("../controllers/commonController");
const isAuthenticated = require("../middlewares/isAuthenticated");
const router = express.Router()

router.post('/login', isAuthenticated, loginUser)

module.exports = router