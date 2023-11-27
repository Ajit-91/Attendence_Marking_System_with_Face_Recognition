const mongoose = require('mongoose')

const announcementSchema = new mongoose.Schema({
    announcer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    batch: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Announcement', announcementSchema, 'Announcement')