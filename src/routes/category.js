const express = require('express');
const router = express.Router();
const { requireSignin, checkAdminUser } = require('../Common Middleware');
const { createCategory, getCategory } = require('../controllers/category');



router.post('/create',requireSignin,checkAdminUser,createCategory)
router.get('/get',getCategory)

module.exports=router;