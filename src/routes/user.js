const express=require('express');
const { signup } = require('../controllers/user');
const router=express.Router();
const morgan=require('morgan');
morgan('tiny')



router.post('/signup',signup)

router.post('/signin',(req,res)=>{
    res.send("Sucessful")

})

module.exports=router;
