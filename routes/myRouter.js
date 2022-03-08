const express = require("express")
const router = express.Router()

// Model Product
const Product = require("../models/products")

// อัพโหลดไฟล์
const multer = require("multer")
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,"./public/images/products")
    },
    filename: function(req, file, cb){
        cb(null, Date.now()+".jpg")
    }
})
//เริ่มต้น upload
const upload = multer({
    storage: storage
})

router.get("/", (req, res)=>{
    Product.find().exec((err, doc)=>{
        res.render("index", {products: doc})
    })
})

router.get("/form", (req, res)=>{
    res.render("form")
})

router.get("/manage", (req, res)=>{
    Product.find().exec((err, doc)=>{
        res.render("manage", {products: doc})
    })
})

router.get("/:id", (req, res)=>{
    const product_id = req.params.id

    Product.findOne({_id: product_id}).exec((err, doc)=>{ 
        console.log("Show Product: ", doc.name)
        if(err){
            console.log("Error show product: ", err)
        }else{
            res.render("product",{item: doc})
        }
    })
    
})

router.get("/save", (req, res)=>{
    console.log(req.query.description)
})

router.post("/save", upload.single("image"), (req, res)=>{

    let data = new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.file.filename,
        description: req.body.description
    }) 

    Product.saveProduct(data,(err)=>{
        console.log(`Error Product.saveProduct: ${err}`)
        res.redirect("/")
    })
    
})

router.get("/delete/:id", (req, res)=>{
    Product.findByIdAndDelete(req.params.id,{
        useFindAndModify: false
    }).exec(err=>{
        if(err){
            console.log("Error Delete Product: ",err)
        }
        res.redirect("/manage")
    })
})

// เปิดหน้า edit form
router.post("/edit", (req, res)=>{ 

    const edit_id = req.body.edit_id
    console.log(edit_id)

    Product.findOne({_id: edit_id}).exec((err, doc)=>{ 
        if(err){
            console.log(err)
        }else{
            res.render("edit",{product: doc})
        }
    })

})

router.post("/update", (req, res)=>{ 
    const update_id = req.body.update_id
    let data = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    }

    Product.findByIdAndUpdate(update_id, data, {
        useFindAndModify: false
    }).exec(err=>{
        if(err){
            console.log("Error Update Product: ",err)
        }
        res.redirect("/manage")
    })
})

module.exports = router