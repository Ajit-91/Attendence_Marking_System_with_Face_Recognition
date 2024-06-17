const Attendence = require("../models/Attendence")
const AttendenceCode = require("../models/AttendenceCode")
const { customAlphabet } = require('nanoid');

// Function to convert degrees to radians
const degreesToRadians = (degrees)  => {
    return degrees * Math.PI / 180;
}

// Function to calculate distance using Haversine formula
// d=2R⋅arcsin(sin2(Δlat/2​)+cos(lat1​)⋅cos(lat2​)⋅sin2(Δlon/2​)​)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
}

exports.getDateString = (dateStr) => {
    const date = new Date(dateStr || Date.now())
    const dateString = date.getDate() + '_' + (date.getMonth() + 1) + '_' + date.getFullYear().toString().slice(-2)
    return dateString
}

exports.isCodeValid = async (attCode) => {
    const foundCode = await AttendenceCode.findOne({ code: attCode, expiresAt: { $gt: Date.now() } })
    if (foundCode) return {valid : true, data : foundCode}
    else return false
}

exports.isValidLocation = async (attCode, studentLat, studentLon) => {
    console.log("checking location validity")
    const foundCode = await AttendenceCode.findOne({ code: attCode })
    const { location } = foundCode
    const lat = location.coordinates[0]
    const lon = location.coordinates[1]
    const distance = calculateDistance(lat, lon, studentLat, studentLon)
    console.log({distance})
    if (distance <= 0.5) return true
    else return false
}

exports.isAttendenceMarked = async (studentId, attCode) => {
    const dateString = this.getDateString()
    const foundAtt = await Attendence.findOne({ student: studentId, dateString, attCode })
    console.log({dateString, foundAtt, attCode})
    if (foundAtt) return true
    else return false
}

exports.getCode = () => {
    const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    const nanoid = customAlphabet(alphabet, 8);
    const unique8Digit = nanoid()
    return unique8Digit
}

