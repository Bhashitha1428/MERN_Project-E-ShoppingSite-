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
     enum:['user','admin'],
     //default:'user'
    },
    contactNumber:{type:String},
    profilePicture:{type:String},
    
    
},{timestamps:true})

userSchema.virtual('password')
   .set(function(password){
       this.hashPassword=bcrypt.hashSync(password,10);
   });

userSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
  }); 

userSchema.methods={
    
    authenticate:function(password){
        return bcrypt.compareSync(password,this.hashPassword)
    }
}


module.exports=mongoose.model('User',userSchema);