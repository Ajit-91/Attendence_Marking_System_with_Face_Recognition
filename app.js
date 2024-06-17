require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { mongoose } = require('mongoose')
const path = require('path')
const { loadModels, prepareFaceMatcher, } = require('./server/utils/faceRecogUtil')
const app = express()

// connecting to db
mongoose.connect(process.env.DB_URI).then(async ()=>{
    console.log('connection succesfull')
    await prepareFaceMatcher()
    // await recogniseFaceTest()
}).catch(err=>console.log(err))

const PORT = process.env.PORT || 8001


// ----------MiddleWares--------------------------
app.use(express.json({
    verify : (req, _, buffer) => req['rawBody'] = buffer
}))
app.use(express.urlencoded({extended : true}))
app.use(cors({ origin: true, credentials: true }))

//  -----------Routes-----------------------------
app.use("/api", require("./server/routes/commonRoutes"))
app.use("/api/admin", require("./server/routes/adminRoutes"))
app.use("/api/student", require("./server/routes/studentRoutes"))

// ----------deployment---------------------------

if(process.env.NODE_ENV === "production"){
    console.log(path.join(__dirname, "client", "build", "index.html"))
    app.use(express.static(path.join(__dirname, "client", "build")))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"))
    })
}

// ----------deployment---------------------------


// const changeStream = User.watch();
// changeStream.on('change', async () => {
//     await prepareFaceMatcher();
// });

const startServer = () => {
    app.listen(PORT, () => {
        console.log(`Server started at port ${PORT}`)
    })
}

loadModels().then(() => {
    startServer()
}).catch(err => {
    console.log(err)
})