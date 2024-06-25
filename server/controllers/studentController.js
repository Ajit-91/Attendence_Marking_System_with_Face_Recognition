const Attendence = require("../models/Attendence");
const catchErrors = require("../utils/catchErrors");
const User = require('../models/User')
const { successResponse, errorResponse } = require("../utils/response");
const { isCodeValid, isAttendenceMarked, getDateString, isValidLocation } = require("../utils/AttendenceUtils");
const Announcement = require("../models/Announcement");
const { isFaceMatched, detectFace } = require("../utils/faceRecogUtil");
const sendToken = require("../utils/sendToken");
const { uploadToCloudinary } = require("../utils/cloudinary");
const fs = require('fs')

exports.registerStudent = catchErrors(async (req, res) => {
  const { name, enrollmentNo, password, batch, branch } = req.body
  if (!name || !enrollmentNo || !password || !batch || !branch || !req.file) {
      return res.status(400).json(errorResponse("one or more fields required"))
  }
  const file = req.file
  const data = await detectFace(file)
  
  if(!data){
    return res.status(400).json(errorResponse('No Face detected, Please ensure proper lighting on your face'))
  }
  const { faceDescriptor, box } = data
  const url = await uploadToCloudinary(file) 
  if(!url) return res.status(500).json(errorResponse('Could not upload image, Please try again'))

  const user = new User({
      role: 'STUDENT',
      name,
      enrollmentNo,
      password,
      batch,
      branch,
      images : [url],
      faceDescriptor: Array.from(faceDescriptor)
  })

  const savedUser = await user.save()
 
  if(savedUser){
      sendToken(savedUser, res, {box})
  }
}) 

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
    const { attCode } = req.body
    const validCode = await isCodeValid(attCode)
    // console.log({validCode})
    if (!validCode) return res.status(400).json(errorResponse('Attendence Code is Expired'))
    const markedAlready = await isAttendenceMarked(req.user._id, validCode.data._id)
    if (markedAlready) return res.status(400).json(errorResponse('You have already marked your Attendence'))
    
    const detectionData = await detectFace(req.file)
    fs.unlinkSync(req.file.path);
    console.log(`file deleted - ${req.file.path}`)
    if(!detectionData){
        return res.status(400).json(errorResponse('No Face detected, Please ensure proper lighting on your face'))
    }
    const { faceDescriptor, box } = detectionData
    const {faceDescriptor : expectedFaceDescriptor} = await User.findById(req.user._id).select("faceDescriptor") 
    const expectedLabel = `${req.user.name} (${req.user.enrollmentNo})`
    const result = isFaceMatched(new Float32Array(expectedFaceDescriptor), faceDescriptor)

    if(!result){
      return res.status(400).json(errorResponse(`Failed to mark attendance due to face mismatch, Expected ${expectedLabel}`))
    }

    const dateString = getDateString()
    // const resultLabel = recogniseFace(faceDescriptor)
    // console.log({resultLabel, expectedLabel})
    // if(resultLabel !== expectedLabel) 
    //   return res.status(400).json(errorResponse(`Failed to mark attendance, Expected ${expectedLabel} but got ${resultLabel}`))

    const att = new Attendence({
        attCode : validCode.data._id,
        student: req.user._id,
        dateString,
        status: 'present'
    })

    const savedAtt = await att.save()
    res.status(200).json(successResponse("success", {
      ...savedAtt._doc,
      box,
      resultLabel: expectedLabel
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

