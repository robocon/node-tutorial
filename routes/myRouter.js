const express = require('express')
const router = express.Router()
const Product = require("../models/products")

router.get("/", (req, res)=>{
    res.render("index",{
        products: [{
            id: 1, name: "โน๊ตบุ๊ค",price: "25,000",image: "images/products/product1.png"
        },{
            id: 2, name: "เสื้อ",price: "2,500",image: "images/products/product2.png"
        },{
            id: 3, name: "หูฟัง",price: "400",image: "images/products/product3.png"
        }]
    })
})

router.get("/form", (req, res)=>{
    res.render("form")
})

router.get("/manage", (req, res)=>{
    res.render("manage")
})

router.get("/product/:id", (req, res)=>{
    console.log(res.id)
    res.render("product",{id:res.id})
})

router.get("/save", (req, res)=>{
    console.log(req.query.description)
})

module.exports = router