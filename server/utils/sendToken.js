const { successResponse } = require("./response")

const sendToken =  (user, res)=>{
    const token = user.getToken()
    const {faceDescriptor, password, ...rest} = user._doc
    res.status(200).json(successResponse("success", {
        user: rest,
        token
    }))
}


module.exports = sendToken