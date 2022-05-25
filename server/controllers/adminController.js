const User = require('../models/User')
const catchErrors = require('../utils/catchErrors')
const { successResponse, errorResponse } = require('../utils/response')

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