const Attendence = require("../models/Attendence");
const catchErrors = require("../utils/catchErrors");
const User = require('../models/User')
const { successResponse, errorResponse } = require("../utils/response");


exports.getFaceRecognitionLabels = catchErrors(async (req, res) => {
    const info = await User.find({role : {$ne : 'ADMIN'}}).select('name image')
    console.log(info)
    res.status(200).json(successResponse('success', info))
})

exports.markAttendence = catchErrors(async (req, res) => {
    
    const foundAtt = await Attendence.findOne({student : req.User._id})
    if(!foundAtt){
        return res.status(400).json(errorResponse('Attendence not found'))
    }
    foundAtt.status = 'present'
    const savedAtt = await foundAtt.save()
    res.status(200).json(successResponse("success", savedAtt))
})