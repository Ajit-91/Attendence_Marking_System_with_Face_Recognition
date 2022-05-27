const express = require("express");
const { registerStudent } = require("../controllers/adminController");
const isAdmin = require("../middlewares/isAdmin");
const isAuthenticated = require("../middlewares/isAuthenticated");
const router = express.Router()

router.post('/register-student', isAuthenticated, isAdmin, registerStudent)
router.get('/get-attendence-code', isAuthenticated, isAdmin)

module.exports = router