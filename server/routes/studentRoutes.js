const express = require("express");
const { getFaceRecognitionLabels } = require("../controllers/studentController");
const isAuthenticated = require("../middlewares/isAuthenticated");
const router = express.Router()

router.get('/get-face-recognition-info',  getFaceRecognitionLabels)

module.exports = router