const express = require("express");
const { getFaceRecognitionLabels, validateAtFirstStep, markAttendence, getMyAttendence } = require("../controllers/studentController");
const isAuthenticated = require("../middlewares/isAuthenticated");
const router = express.Router()

router.get('/get-face-recognition-info', isAuthenticated, getFaceRecognitionLabels)
router.post('/validate-at-first-step', isAuthenticated, validateAtFirstStep)
router.post('/mark-attendence', isAuthenticated, markAttendence)
router.get('/get-my-attendence', isAuthenticated, getMyAttendence)

module.exports = router