const express = require("express");
const { loginUser, fetchEnrollmentNo, registerUser, getSignedUrlForS3 } = require("../controllers/commonController");
const isAuthenticated = require("../middlewares/isAuthenticated");
const router = express.Router()

router.get('/get-enrollment-no', fetchEnrollmentNo)
router.post('/register', registerUser)
router.post('/login', loginUser)

router.post('/get-signed-url', getSignedUrlForS3)


module.exports = router