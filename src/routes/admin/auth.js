const express=require('express');

const router=express.Router();
const morgan=require('morgan');
const {  signup, signin,checkAdminUser } = require('../../controllers/admin/auth');
morgan('tiny')



router.post('/signup',signup)

router.post('/signin',signin)

router.post('/profile',checkAdminUser,(req,res)=>{
    res.status(200).json({msg:"User profile",user:req.user})
})

module.exports=router;
