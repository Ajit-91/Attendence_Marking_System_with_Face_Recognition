const { validationResult } = require("express-validator");
const { errorResponse } = require("./response");

 const catchErrors = (controller) => async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

       return await controller(req, res)
    } catch (error) {
        console.log(error)
        return res.status(500).json(errorResponse(error.message))
    }
}

module.exports = catchErrors