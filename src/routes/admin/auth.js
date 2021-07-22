const express=require('express');

const router=express.Router();
const morgan=require('morgan');
const {  signup, signin,checkAdminUser } = require('../../controllers/admin/auth');
const { signupValidator, isRequestValid, signinValidator } = require('../../validators/auth');
morgan('tiny')



router.post('/signup',signupValidator,isRequestValid,signup)

router.post('/signin',signinValidator,isRequestValid,signin)

router.post('/profile',checkAdminUser,(req,res)=>{
    res.status(200).json({msg:"User profile",user:req.user})
})

module.exports=router;
