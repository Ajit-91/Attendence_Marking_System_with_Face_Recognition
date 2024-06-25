const multer = require("multer")
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './server/uploads')
    },
    filename: (req, file, cb) => {
        console.log("file",file)
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniquePrefix + '-' + file.originalname)
    },
})

const upload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
        let extnsn = path.extname(file.originalname)
        if (extnsn !== '.jpg' && extnsn !== '.jpeg' && extnsn !== '.png') {
            cb(new Error('file type not supported', false))
            return
        }
        cb(null, true)
    },
 })

module.exports =  upload