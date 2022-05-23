const mongoose = require('mongoose')

const attendenceSchema = new mongoose.Schema({
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
})

module.exports = mongoose.model('Attendence', attendenceSchema, 'Attendence')