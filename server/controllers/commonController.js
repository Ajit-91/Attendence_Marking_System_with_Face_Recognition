const User = require('../models/User');
const catchErrors = require('../utils/catchErrors');
const { successResponse, errorResponse } = require('../utils/response');
const sendToken = require('../utils/sendToken');

// ============Login User===============

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
    return res.status(200).json(successResponse("sucess", req.User))
})
