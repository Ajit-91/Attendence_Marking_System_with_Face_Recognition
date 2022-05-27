const User = require('../models/User')
const catchErrors = require('../utils/catchErrors')
const { successResponse, errorResponse } = require('../utils/response')
const AttendenceCode = require('../models/AttendenceCode');
const { getCode } = require('../utils/AttendenceUtils');


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
    const {subject} = req.body
    const code = getCode()
    const expiresAt = Date.now() + 15 * 60 * 1000; // expires after 15 minutes of creation

    const attCode = new AttendenceCode({
        code,
        expiresAt,
        subject
    })

    const savedAttCode = await attCode.save()
    res.status(200).json(successResponse('success', savedAttCode))
})