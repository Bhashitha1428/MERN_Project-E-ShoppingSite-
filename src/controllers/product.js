const  slugify  = require('slugify')
const Product=require('../models/product')

exports.addProduct=(req,res)=>{

const {name,price,description,category,quentity}=req.body

const productImg=req.files.map(file=>{
    //console.log(file)
    return {img:file.filename}
})
//console.log(productImg)

const product=new Product({
    name,
    slug:slugify(name),
    price,
    description,
    category,
    quentity,
    createdBy:req.user._id,
    productPictures:productImg
})

  product.save()
         .then(product=>{
            res.status(201).json({product })
         })
         .catch(err=>{
             res.status(400).json({err})
         })

   
}