const Attendence = require("../models/Attendence");
const catchErrors = require("../utils/catchErrors");
const User = require('../models/User')
const { successResponse, errorResponse } = require("../utils/response");
const { isCodeValid, isAttendenceMarked, getDateString, isValidLocation } = require("../utils/AttendenceUtils");
const Announcement = require("../models/Announcement");
const { recogniseFace } = require("../utils/faceRecogUtil");


exports.getFaceRecognitionLabels = catchErrors(async (req, res) => {
    const info = await User.find({ role: { $ne: 'ADMIN' } }).select('name images')
    console.log({ info })
    res.status(200).json(successResponse('success', info))
})

exports.validateAtFirstStep = catchErrors(async (req, res) => {
    const { attCode, coordinates } = req.body
    const validCode = await isCodeValid(attCode)
    // console.log({validCode})
    if (!validCode) return res.status(400).json(errorResponse('Attendence Code is invalid or is Expired'))

    const validLocation = await isValidLocation(attCode, coordinates[0], coordinates[1]);
    if (!validLocation) return res.status(400).json(errorResponse('You are not in the valid location to mark your Attendence'));

    const markedAlready = await isAttendenceMarked(req.user._id, validCode.data._id)
    // console.log({markedAlready})
    if (markedAlready) return res.status(400).json(errorResponse('You have already marked your Attendence'))

    res.status(200).json(successResponse('success'))
})

exports.markAttendence = catchErrors(async (req, res) => {
    const { attCode, faceDescriptor } = req.body
    const validCode = await isCodeValid(attCode)
    // console.log({validCode})
    if (!validCode) return res.status(400).json(errorResponse('Attendence Code is Expired'))
    const markedAlready = await isAttendenceMarked(req.user._id, validCode.data._id)
    if (markedAlready) return res.status(400).json(errorResponse('You have already marked your Attendence'))

    const dateString = getDateString()
    const expectedLabel = `${req.user.name} (${req.user.enrollmentNo})`
    const resultLabel = recogniseFace(faceDescriptor)
    console.log({resultLabel, expectedLabel})
    if(resultLabel !== expectedLabel) 
      return res.status(400).json(errorResponse(`Failed to mark attendance, Expected ${expectedLabel} but got ${resultLabel}`))

    const att = new Attendence({
        attCode : validCode.data._id,
        student: req.user._id,
        dateString,
        status: 'present'
    })

    const savedAtt = await att.save()
    res.status(200).json(successResponse("success", {
      ...savedAtt._doc,
      resultLabel
    }))
})

exports.getMyAttendence = catchErrors(async (req, res) => {
    const {dateString, subject} = req.query
    const query = {}
    if(dateString) query.dateString = getDateString(dateString)
    if(subject) query['attCode.subject'] = {$regex : subject, $options : 'i'}
 
    const attHistory = await Attendence.aggregate([
        {
          $lookup: {
            from: 'AttendenceCode',
            localField: 'attCode',
            foreignField: '_id',
            as: 'attCode',
          },
        },
        {
          $match: {
            student: req.user._id ,
            ...query,
          },
        },
        {
          $lookup: {
            from: 'User',
            localField: 'student',
            foreignField: '_id',
            as: 'student',
          },
        },
        {
          $unwind: '$attCode', // attCode will always be an array of length 1 hence unwinding it
        },
        {
          $unwind: '$student', // student will always be an array of length 1 hence unwinding it
        },
        {
          $sort: { createdAt: -1 },
        },
      ]);

    res.status(200).json(successResponse('success', attHistory))
})


exports.getAnnouncements = catchErrors(async (req, res) => {
    const announcmnts = await Announcement.find({
        batch: req.user.batch, 
        branch: req.user.branch
    })
    .populate('announcer', 'name')
    .sort({createdAt : 'desc'})
    res.status(200).json(successResponse('success', announcmnts))
})

