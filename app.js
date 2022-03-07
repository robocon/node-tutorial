const express = require('express')
const path = require('path')
const app = express()
const router = require("./routes/myRouter")

app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs")
app.use(router)
app.use(express.static(path.join(__dirname,"public")))

app.listen(8800,()=>{
    console.log("Run Server localhost:8800 ")
})