const express = require('express')
const router = express.Router()
const Post = require('../models/post.js');
const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const adminLayout = '../views/layouts/admin'
jwtSecret= process.env.JWT_SECRET;

// CHECK - LOGIN
const authMiddleware = (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message:'Unauthorized'})
    }
    try{
        const decoded = jwt.verify(token,jwtSecret);
        req.userId = decoded.userId;
        next();
    }
    catch(error){
          return res.status(401).json({message:'Unauthorized'})
    }
}





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

// Get
// Admin-Dashboard


router.get('/dashboard', authMiddleware , async (req,res)=>{

    try {
     const locals = {
            title : "Admin",
            description:"Simple Blog Created with NodeJs ,Express & MongoDB"
        }


        const data = await Post.find();
        res.render('admin/dashboard',{
            locals,
            data,
            layout : adminLayout
        });
      
    } catch (error) {
        console.log(error);
        
    }



});

// Get
// Admin-Create New Post

router.get('/add-post', authMiddleware , async (req,res)=>{

    try {
     const locals = {
            title : "Add Post",
            description:"Simple Blog Created with NodeJs ,Express & MongoDB"
        }

        const data = await Post.find();
        res.render('admin/add-post',{
            locals,
            layout : adminLayout
        });
      
    } catch (error) {
        console.log(error);
        
    }
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