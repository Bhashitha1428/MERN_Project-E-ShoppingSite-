const express = require('express');
const router = express.Router();
const { requireSignin, checkAdminUser } = require('../Common Middleware');
const { createCategory, getCategory } = require('../controllers/category');

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




router.post('/create',requireSignin,checkAdminUser,upload.single('categoryImg'),createCategory)
router.get('/get',getCategory)

module.exports=router;