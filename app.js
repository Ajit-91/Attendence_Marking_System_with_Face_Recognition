require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { mongoose } = require('mongoose')
const path = require('path')
const app = express()

// connecting to db
mongoose.connect(process.env.DB_URI).then(()=>{
    console.log('connection succesfull')
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

app.listen(PORT, ()=>{
    console.log(`server started at port ${PORT}`)
})