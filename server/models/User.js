const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    role : {
        type : String,
        enum : ['ADMIN', 'STUDENT'],
        default : 'STUDENT'
    },
    name : {
        type : String,
        required : true
    },
    images : [String],
    enrollmentNo : {
        type : String,
        required : true,
        length : 10,
        unique : true,
        index : true
    },
    password : {
        type : String,
        required : true,
        select : false
    }
}, {timestamps : true})


// --------Hashing password------------------------
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next();
})


// --------Comparing password------------------------
userSchema.methods.comparePassword = async function (password) {

    try {
        return await bcrypt.compare(password, this.password)
    } catch (err) {
        console.log(err)
    }
}

// --------generatingToken----------------------------

userSchema.methods.getToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: Math.floor(Date.now() / 1000) + process.env.JWT_EXPIRE * 24 * 60 * 60
    })
}

module.exports = mongoose.model('User', userSchema, 'User')