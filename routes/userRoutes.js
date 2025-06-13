import express, { Router } from 'express';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register',(async(req,res)=>{
    try{
   const {name,password,email}=req.body

 
const userExists=await User.findOne({email})
if(userExists){
 return res.status(400).json({message:'User already exists'})

}
const user=new User({name,email,password})
await user.save()
res.status(201).json({message:'User registered successfully'})
    }catch(error){
        res.status(500).json({message:'Server error',error})
    }
}))


router.post('/login',(async(req,res)=>{
    try{
    const {email,password}=req.body
    const user=await User.findOne({email})
    if(!user){
        res.status(401).json({message:'Invalid credential'})
    }
    const isMatch=await user.matchPassword(password)
    if(!isMatch){
        return res.status(401).json({message:'Invalid credentials'})
    }


const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'30d'})
res.json({token,user:{id:user._id,name:user.name,email:user.email}})
    }catch(error){
        res.status(500).json({message:'Server',error})
    }
}))
export default router