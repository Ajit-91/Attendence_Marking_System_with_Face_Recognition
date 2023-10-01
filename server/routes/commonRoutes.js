const express = require("express");
const { loginUser, 
            fetchEnrollmentNo, 
            registerUser, 
            // getSignedUrlForS3,
            fetchUser,
            checkIfAlreadyRegistered,
            getAnnouncements
        } = require("../controllers/commonController");
const isAuthenticated = require("../middlewares/isAuthenticated");
const router = express.Router()

router.get('/get-enrollment-no', fetchEnrollmentNo)
router.get('/fetch-user', isAuthenticated, fetchUser)
router.post('/check-if-already-registered', checkIfAlreadyRegistered)
router.post('/register', registerUser)
router.post('/login', loginUser)

// router.post('/get-signed-url', getSignedUrlForS3)

router.get('/get-announcements', isAuthenticated, getAnnouncements)


module.exports = router