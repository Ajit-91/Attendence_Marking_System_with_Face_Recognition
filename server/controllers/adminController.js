const User = require('../models/User')
const catchErrors = require('../utils/catchErrors')
const { successResponse, errorResponse } = require('../utils/response')
const AttendenceCode = require('../models/AttendenceCode');
const { getCode, getDateString } = require('../utils/AttendenceUtils');
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
    const {subject, validity, batch, branch} = req.body
    let minutes = Number(validity)
    console.log({minutes})
    const code = getCode()
    const expiresAt = Date.now() + minutes * 60 * 1000; // expires after given  minutes of creation

    const attCode = new AttendenceCode({
        code,
        expiresAt,
        subject,
        batch,
        branch,
        generatedBy : req.user._id,
        validity : minutes
    })

    const savedAttCode = await attCode.save()
    res.status(200).json(successResponse('success', savedAttCode))
})

exports.getAllAttCodes = catchErrors(async (req, res) => {
    const attCodes = await AttendenceCode.find({generatedBy: req.user._id}).sort({createdAt : 'desc'})
    res.status(200).json(successResponse('success', attCodes))
})

exports.getAttndenceHistory = catchErrors(async (req, res) => {
    const {dateString, batch, branch, subject} = req.query
    const query = {}
    if(dateString) query.dateString = getDateString(dateString)
    if(batch) query['attCode.batch'] = batch
    if(branch) query['attCode.branch'] = branch
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
            'attCode.generatedBy': req.user._id,
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

exports.makeAnnouncement = catchErrors(async (req, res) => {
    const { batch, branch, description } = req.body
    if(!description || !batch || !branch) return res.status(400).json(errorResponse('one or more fields are required'))

    const announcement  = new Announcement({
        announcer: req.user._id,
        ...req.body,
    })
    const savedAnncmnt = await announcement.save()
    res.status(200).json(successResponse('success', savedAnncmnt))
})

exports.getAnnouncements = catchErrors(async (req, res) => {
  const announcmnts = await Announcement.find({
    announcer: req.user._id
  })
  .populate('announcer', 'name')
  .sort({createdAt : 'desc'})

  res.status(200).json(successResponse('success', announcmnts))
})