const express=require('express');
const { signup, signin } = require('../controllers/auth');
const router=express.Router();


const { signupValidator, isRequestValid, signinValidator } = require('../validators/auth');



router.post('/signup',signupValidator,isRequestValid,signup)

router.post('/signin',signinValidator,isRequestValid,signin)

router.post('/profile',(req,res)=>{
    res.status(200).json({msg:"User profile",user:req.user})
})

module.exports=router;
