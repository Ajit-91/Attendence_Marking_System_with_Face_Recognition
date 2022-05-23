const express = require("express");
const { loginUser } = require("../controllers/commonController");
const isAuthenticated = require("../middlewares/isAuthenticated");
const router = express.Router()

router.post('/login', loginUser)

module.exports = router