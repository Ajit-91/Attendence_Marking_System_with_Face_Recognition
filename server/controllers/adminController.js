const User = require('../models/User')
const catchErrors = require('../utils/catchErrors')
const { successResponse, errorResponse } = require('../utils/response')
const AttendenceCode = require('../models/AttendenceCode');
const { getCode } = require('../utils/AttendenceUtils');
const Attendence = require('../models/Attendence');
const Announcement = require('../models/Announcement');


exports.registerStudent = catchErrors(async (req, res) => {
    const { name, enrollmentNo, password } = req.body
    if (!name || !enrollmentNo || !password) {
        return res.status(400).json(errorResponse("one or more fields required"))
    }

    const foundUser = await User.findOne({ enrollmentNo })
    if (foundUser) return res.status(400).json(errorResponse("enrollmentNo Already registered"))

    const user = new User({
        ...req.body
    })

    const savedUser = await user.save()
    res.status(200).json(successResponse("success", savedUser))
}) 

exports.generateAttCode = catchErrors (async (req, res) => {
    const {subject, validity} = req.body
    let minutes = Number(validity)
    console.log({minutes})
    const code = getCode()
    const expiresAt = Date.now() + minutes * 60 * 1000; // expires after given  minutes of creation

    const attCode = new AttendenceCode({
        code,
        expiresAt,
        subject,
        validity : minutes
    })

    const savedAttCode = await attCode.save()
    res.status(200).json(successResponse('success', savedAttCode))
})

exports.getAllAttCodes = catchErrors(async (req, res) => {
    const attCodes = await AttendenceCode.find().sort({createdAt : 'desc'})
    res.status(200).json(successResponse('success', attCodes))
})

exports.getAttndenceHistory = catchErrors(async (req, res) => {
    const attHistory = await Attendence.find()
        .populate('attCode')
        .populate('student')
        .sort({createdAt : 'desc'})
    
    res.status(200).json(successResponse('success', attHistory))
})

exports.makeAnnouncement = catchErrors(async (req, res) => {
    const {description} = req.body
    if(!description) return res.status(400).json(errorResponse('description is required'))

    const announcement  = new Announcement({
        description
    })
    const savedAnncmnt = await announcement.save()
    res.status(200).json(successResponse('success', savedAnncmnt))
})