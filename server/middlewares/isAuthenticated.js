const jwt = require('jsonwebtoken')
const User = require('../models/User')
const {errorResponse} = require('../utils/response')

const isAuthenticated = async (req, res, next) =>{
    try {
        let token
        if(req.headers.authorization){
            token = req.headers.authorization.split(' ')[1]
        }

        if(!token || token === 'undefined') return res.status(401).json(errorResponse("Please login "))

        const decodedData =  jwt.verify(token, process.env.JWT_SECRET)
        const resp = await User.findById(decodedData._id)
        
        if(resp){
            req.user = resp;
            next()
        }else{
            return res.status(401).json(errorResponse("Please login "))
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({msg : "something went wrong", error : err.message})
    }
}

module.exports = isAuthenticated