const express = require('express')
const path = require('path')
const cookieParser = require("cookie-parser")
const session = require("express-session")
const app = express()
const router = require("./routes/myRouter")

app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs")

// สำหรับ POST Method
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(session({
    secret:"mysession",
    resave:false,
    saveUninitialized:false
}))
app.use(router)

// ตั้งค่า static file ไว้ที่ folder public
app.use(express.static(path.join(__dirname,"public")))

app.listen(8800,()=>{
    console.log("Run Server localhost:8800 ")
})