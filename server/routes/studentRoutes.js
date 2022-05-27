const express = require("express");
const { getFaceRecognitionLabels, validateAtFirstStep, markAttendence } = require("../controllers/studentController");
const isAuthenticated = require("../middlewares/isAuthenticated");
const router = express.Router()

router.get('/get-face-recognition-info', isAuthenticated, getFaceRecognitionLabels)
router.post('/validate-at-first-step', isAuthenticated, validateAtFirstStep)
router.post('/mark-attendence', isAuthenticated, markAttendence)

module.exports = router