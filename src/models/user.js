const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const userSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:20

    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:20

    },
    userName:{
        type:String,
        unique:true,
        trim:true,
        required:true,
        index:true,
        lowercase:true
    },
    email:{
        type:String,
        unique:true,
        trim:true,
        required:true
    },
    hashPassword:{
        type:String,
        unique:true,
        trim:true,
        required:true
    },
  
    role:{
     type:String,
     enum:['user','admin']
    },
    contactNumber:{type:String},
    profilePicture:{type:String},
    
    
},{timestamps:true})

userSchema.virtual('password')
   .set(function(password){
       this.hashPassword=bcrypt.hashSync(password,10);
   })

userSchema.method={
    authenticate:(password)=>{
        return bcrypt.compareSync(password,this.hashPassword)
    }
}


module.exports=mongoose.model('User',userSchema);