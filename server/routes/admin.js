const express = require('express')
const router = express.Router()
const Post = require('../models/post.js');
const User = require('../models/User.js');


const adminLayout = '../views/layouts/admin'

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
    console.log(req.body);
    
     
         await Post.deleteMany();
        const data = await Post.find();
        // res.render('admin/index',{locals,layout : adminLayout});
        res.redirect('/admin')
    } catch (error) {
        console.log(error);
        
    }
});

module.exports = router;