const User = require('../models/User');
const Announcement = require('../models/Announcement');
const catchErrors = require('../utils/catchErrors');
const { successResponse, errorResponse } = require('../utils/response');
const sendToken = require('../utils/sendToken');
const aws = require('aws-sdk');


// ============Login User===============

exports.fetchEnrollmentNo = catchErrors(async (req, res) => {
    const totalStudents = await User.find({role : 'STUDENT'}).countDocuments()
    if(totalStudents > 99) return res.status(501).json(errorResponse('max students limit reached'))

    let prefix
    if(totalStudents < 9){
        prefix = `00${totalStudents + 1}`
    }else{
        prefix = `0${totalStudents + 1}`
    }
    let enrollmentNo = prefix + '1640322'
    res.status(200).json(successResponse('success', {enrollmentNo}))
})
exports.checkIfAlreadyRegistered = catchErrors(async (req, res) => {
    const {enrollmentNo} = req.body
    const foundUser = await User.findOne({ enrollmentNo })
    if (foundUser) return res.status(400).json(errorResponse("Enrollment No Already registered"))
    res.status(200).json(successResponse('Enrollment no not registered'))
})

exports.registerUser = catchErrors(async (req, res) => {
    const { name, enrollmentNo, password, images } = req.body
    if (!name || !enrollmentNo || !password || !images) {
        return res.status(400).json(errorResponse("one or more fields required"))
    }

    const user = new User({
        ...req.body
    })

    const savedUser = await user.save()
    if(savedUser){
        sendToken(savedUser, res)
    }
}) 

exports.loginUser = catchErrors(async (req, res) => {
    const { enrollmentNo, password } = req.body;
    if (!enrollmentNo || !password) return res.status(400).json(errorResponse("one or more fields required"))

    const foundUser = await User.findOne({ enrollmentNo }).select("+password")
    if (!foundUser) return res.status(400).json(errorResponse("Either enrollment No or password is wrong"))

    const isMatching = await foundUser.comparePassword(password);
    if (!isMatching) return res.status(400).json(errorResponse("Either enrollment No or password is wrong"))
    if (foundUser && isMatching) {
        sendToken(foundUser, res)
    }
})

// ============fetch User===============

exports.fetchUser = catchErrors(async (req, res) => {
    return res.status(200).json(successResponse("sucess", {user : req.user}))
})


// =========uploading images to s3==============

// exports.getSignedUrlForS3 = catchErrors(async (req, res) => {
//     const s3 = new aws.S3({
//         accessKeyId: process.env.S3_ACCESS_KEY_ID,
//         secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
//         region: process.env.S3_BUCKET_REGION
//     })

//     const { fileNames, folder } = req.body

//     const urls = fileNames.map((item) => {
//         return s3.getSignedUrl('putObject', {
//             Bucket: process.env.S3_BUCKET_NAME,
//             Key: folder + '/' + Date.now() + '-' + item,
//             Expires: 600,
//             ContentType: 'image/*',
//         });
//     })

//     return res.status(200).json(successResponse("success", urls))
// })

exports.getAnnouncements = catchErrors(async (req, res) => {
    const announcmnts = await Announcement.find().sort({createdAt : 'desc'})
    res.status(200).json(successResponse('success', announcmnts))
})