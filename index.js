const express = require('express')
const mongoose = require('mongoose')
const schema = require('./Schema');
require('dotenv').config();

const app= express();
app.use(express.json());

async function mongooseConnect(){
    try{
    await mongoose.connect(process.env.mongoose_string)
    console.log('connected to database');
     }catch(err){
        console.log(err)
     }
}
mongooseConnect();

app.post('/users', async(req,res)=>{
    try{
        const user = new schema(req.body)
        const savedUser = await user.save();
        res.status(201).send({msg:'user created',data:savedUser})

    }catch(err){
        res.status(500).send({msg:'something went wrong',err})
    }


})
app.get('/users',async (req,res)=>{
    try{
        const user = await schema.find(); 
        res.status(201).send({msg:'user data',data:user})

    }catch(err){
        res.status(500).send({msg:'something went wrong',err})
    }
})

app.listen(process.env.PORT||3000,()=>{
    console.log(`server is running on port: ${process.env.PORT}`);
})
