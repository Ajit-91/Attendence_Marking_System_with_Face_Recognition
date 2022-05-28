const mongoose = require('mongoose')

const attendenceSchema = new mongoose.Schema({
    attCode : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'AttendenceCode'
    },
    student : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    dateString : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true
    }
}, {timestamps : true})

module.exports = mongoose.model('Attendence', attendenceSchema, 'Attendence')