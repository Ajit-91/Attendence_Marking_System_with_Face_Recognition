const { errorResponse } = require("../utils/response")

const isAdmin = async (req, res, next) => {
    try {
        if(req.user.role === "ADMIN") next()
        else{
            return res.status(401).json(errorResponse("Access Denied"))
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(errorResponse(err.message))
    }
}

module.exports = isAdmin