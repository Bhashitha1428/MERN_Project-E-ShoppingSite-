const User=require('../models/user');
const jwt=require('jsonwebtoken')

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


exports.signin=(req,res)=>{
    console.log(req.body.password)
   User.findOne({email:req.body.email})
        .then(user=>{
            
            if(!user){
                return res.status(400).json({
                    msg:'user not found,incorrect email address.'
                })
            }
            
            const a=user.authenticate(req.body.password);
            
            
            if(user.authenticate(req.body.password)){
              try{
                     const token=jwt.sign({_id:user._id},process.env.JWT_TOKEN_SECRET,{ expiresIn: '4h' })

                    const {_id,firstName,lastName,role,fullName}=user

                   res.status(200).json({
                        token:token,
                       user:{_id,firstName,lastName,role,fullName}
                   })
                 }catch(err){
                     return res.status(400).json({
                   // msg:'aaa',
                    error:err
                    })
                }

            }else{
               return res.status(400).json({
                    msg:'Invalid password'
                })
            }
        })
        .catch(err=>{
           return res.status(400).json({
                msg:"Server error",
                error:err
            })
        })

}

exports.checkValidUser=(req,res,next)=>{
    const token=req.headers.authorization.split(" ")[1];
    if(!token) return res.status(400).json({msg:"Authorization failed"})
    const user=jwt.verify(token,process.env.JWT_TOKEN_SECRET)
    if(user.role!='user'){
       return res.status(400).json({
            msg:"U are not authorized user"
        })
    }
    next()

}