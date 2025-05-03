const express=require("express");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const User=require("../Models/User");

const route=express.Router();

const JWT_SECRET=process.env.JWT_SECRET;

router.post("/register",async(req,res)=>{
    const {email,password}=req.body;

    try{
        const exist=await User.findOne({email});
        if(exist){
            return res.status(400).json({message:"Email Aready Registered"})
        }
        const hash=await bcrypt.hash(password,10)
        const user=await User.create({email,password:hash});
        
        const token=jwt.sign({id:user._id},JWT_SECRET);
        res.json({token});
    }
    catch(err){
        res.status(500).json({error:err})
    }
});

router.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const exist=await User.findOne({email});
        if(!exist)
            return res.status(400).json({message:"User with Specified Email doesn't exist!"})
        const isMatch =await bcrypt.compare(password,exist.password);
        if(!isMatch)
            return res.status(400).json({message:"Password is Wrong, Forget Password?"});
        const token =jwt.sign({id:exist._id},JWT_SECRET);
        res.json({token})

    }
    catch(err){
        res.send(500).json({error:err});
    }
})
module.exports= router