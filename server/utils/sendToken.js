const { successResponse } = require("./response")

const sendToken =  (user, res)=>{
    const token = user.getToken()

    res.status(200).json(successResponse("success", {
        user,
        token
    }))
}


module.exports = sendToken