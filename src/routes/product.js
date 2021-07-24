
const { requireSignin, checkAdminUser } = require('../Common Middleware');
const { addProduct } = require('../controllers/product');
const express = require('express');
const router = express.Router();
const shortid=require('shortid')
const path=require('path')

const multer=require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(path.dirname(__dirname),'uploads' ))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' +shortid.generate()+file.originalname)
    }
  })
  const upload = multer({ storage: storage })


router.post('/create',requireSignin,checkAdminUser,upload.array('productImage'),addProduct)


module.exports=router