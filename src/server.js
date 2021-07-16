const express=require('express');
const app=express();
const env=require('dotenv')
const bodyParser=require('body-parser')
const mongoose = require('mongoose');
const userRoute=require('./routes/user')

env.config();
app.use(bodyParser());

//Database connection
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.srssj.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
 {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
         .then(()=>{
             console.log('Database connected')
         })
         .catch(err=>{
             console.log('Database connection fail '+ err)
         })

//Routes
app.use('/api/user',userRoute)

app.get('/api',(req,res)=>{
    res.send("Homr Route works successfully")
})


const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`)
})
console.log(process.env.PORT)