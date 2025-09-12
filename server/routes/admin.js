const express = require('express')
const router = express.Router()
const Post = require('../models/post.js');
const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const adminLayout = '../views/layouts/admin'
jwtSecret= process.env.JWT_SECRET;
// GET 
// Admin-LOGIN PAGE 

router.get('/admin',async (req,res)=>{
    try {
        const locals = {
            title : "Admin",
            description:"Simple Blog Created with NodeJs ,Express & MongoDB"
        }
         await Post.deleteMany();
        const data = await Post.find();
        res.render('admin/index',{locals,layout : adminLayout});
    } catch (error) {
        console.log(error);
        
    }
});

// POSt
// Admin- Check LOGIN PAGE 


router.post('/admin',async (req,res)=>{
    try {
    const {username,password} = req.body;
    
    const user = await User.findOne({username});
     
    if(!user){
        return res.status(401).json({message: 'invalid credentials'})
    }
     const isPasswordValid = await bcrypt.compare(password,user.password)
     if(!isPasswordValid){
        return res.status(401).json({message: 'invalid credentials'})
    }

    const  token = jwt.sign({userId: user._id},jwtSecret);
    res.cookie('token',token,{httpOnly: true});

    res.redirect('/dashboard')



    } catch (error) {
        console.log(error);
        
    }
});

// POSt
// Admin- Check LOGIN PAGE 


router.get('/dashboard',async (req,res)=>{

    res.render('admin/dashboard');

});
// POST
// Admin - Register

router.post('/register',async (req,res)=>{
    try {
    const {username,password} = req.body;
    
   const hashedPassword = await bcrypt.hash(password,10);
   
   try {
    const user = await User.create({username,password:hashedPassword});
    res.status(201).json({message:'user created',user})
   } catch (error) {
    if(error.code === 11000){
        res.status(409).json({message:'user already in use'})
    }
    res.status(500).json({message: 'internal server error'})
   }

    } catch (error) {
        console.log(error);
        
    }
});

module.exports = router;