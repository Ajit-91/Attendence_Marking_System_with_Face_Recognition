const express = require("express");
const { 
    getFaceRecognitionLabels, 
    validateAtFirstStep, 
    markAttendence, 
    getMyAttendence, 
    getAnnouncements, 
    registerStudent
} = require("../controllers/studentController");

const isAuthenticated = require("../middlewares/isAuthenticated");
const upload = require("../utils/multerUtil");
const router = express.Router()

router.post('/register-student', upload.single('image'),  registerStudent)
router.get('/get-face-recognition-info', isAuthenticated, getFaceRecognitionLabels)
router.post('/validate-at-first-step', isAuthenticated, validateAtFirstStep)
router.post('/mark-attendence', isAuthenticated, upload.single('image'), markAttendence)
router.get('/get-my-attendence', isAuthenticated, getMyAttendence)
router.get('/get-announcements', isAuthenticated, getAnnouncements)

module.exports = router