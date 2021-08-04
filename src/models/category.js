const mongoose=require('mongoose')

const categorySchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    slug:{
        type:String,
        unique:true
    },
    parentId:{
        type:String
    },
    categortImg:{type:String}
},{timestamps:true})

module.exports=mongoose.model('Category',categorySchema)