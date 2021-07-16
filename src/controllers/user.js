const User=require('../models/user');

exports.signup=async(req,res)=>{

    try{
    const user=await User.findOne({email:req.body.email})
  

    if(user){return res.status(400).json({msg:'User already registered'})}

    const {firstName, lastName,email,password }=req.body
    
    const _user=new User({
        firstName,
        lastName,
        email,
        password,
        userName:Math.random().toString()
    })

  const result=await _user.save();
  console.log(result)
  res.status(201).json({user:result})
  
    }catch(err){
        return res.status(400).json({
            msg:"Something went wrong",
            error:err
        })
    }



}