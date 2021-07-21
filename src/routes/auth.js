const express=require('express');
const { signup, signin, checkValidUser } = require('../controllers/auth');
const router=express.Router();
const morgan=require('morgan');
morgan('tiny')



router.post('/signup',signup)

router.post('/signin',signin)

router.post('/profile',checkValidUser,(req,res)=>{
    res.status(200).json({msg:"User profile",user:req.user})
})

module.exports=router;
