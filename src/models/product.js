const mongoose=require('mongoose')


const productSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    slug:{
        type:String,
        unique:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    offer:{type:Number},
    description:{
        type:String,
        required:true,
        trim:true
    },
    productPictures:[
        {img:{type:String}}
    ],
    reviews:[
        {
            userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
            review:{type:String}
    }
    ],
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    updatedAt:Date

},{timestamps:true})

module.exports=mongoose.model('Product',productSchema)