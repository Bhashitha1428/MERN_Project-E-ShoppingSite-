const express=require('express');
const app=express();
const env=require('dotenv')
const bodyParser=require('body-parser')
const mongoose = require('mongoose');
const authRoute=require('./routes/auth')
const adminAuthRoute=require('./routes/admin/auth')
const categoryRoute=require('./routes/category')
const productRoute=require('./routes/product')
const cartRoute=require('./routes/cart')


const morgan=require('morgan');

//Third party middleware
if(app.get('env')=='development'){
    app.use(morgan('tiny'));
    console.log('Morgan enabled')
}


env.config();
app.use(bodyParser());

//Database connection
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.srssj.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
 {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,useFindAndModify: false})
         .then(()=>{
             console.log('Database connected')
         })
         .catch(err=>{
             console.log('Database connection fail '+ err)
         })

//Routes
app.use('/api/user',authRoute)
app.use('/api/admin',adminAuthRoute)
app.use('/api/category',categoryRoute)
app.use('/api/product',productRoute)
app.use('/api/cart',cartRoute)

app.get('/api',(req,res)=>{
    res.send("Home Route works successfully")
})


const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`)
})
console.log(process.env.PORT)