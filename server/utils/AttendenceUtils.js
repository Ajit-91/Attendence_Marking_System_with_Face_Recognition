const Attendence = require("../models/Attendence")
const AttendenceCode = require("../models/AttendenceCode")
const { customAlphabet } = require('nanoid');

exports.getDateString = () => {
    const today = new Date()
    const dateString = today.getDate() + '_' + today.getMonth() + '_' + today.getFullYear().toString().slice(-2)
    return dateString
}

exports.isCodeValid = async (attCode) => {
    const foundCode = await AttendenceCode.findOne({ code: attCode, expiresAt: { $gt: Date.now() } })
    if (foundCode) return {valid : true, data : foundCode}
    else return false
}

exports.isAttendenceMarked = async (studentId, attCode) => {
    const dateString = this.getDateString()
    const foundAtt = await Attendence.findOne({ student: studentId, dateString, attCode })
    if (foundAtt) return true
    else return false
}

exports.getCode = () => {
    const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    const nanoid = customAlphabet(alphabet, 8);
    const unique8Digit = nanoid()
    return unique8Digit
}

