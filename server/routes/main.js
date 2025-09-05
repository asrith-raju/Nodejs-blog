const express = require('express')
const router = express.Router()
const Post = require('../models/post.js')
//routes


 

// function insertPostdata (){
//     Post.insertMany([
//         {
//             title:"Building a Blog",
//             body:"This is Body text"
//         },
//         {
//             title:"Discover how to use Nodejs",
//             body:"Discover how to use a popular nodejs framework"
//         },
//         {
//             title:"Discover how to use MongoDb",
//             body:"Discover how The CRUD operations work"
//         },
//     ])
// }
// insertPostdata();




router.get('',async (req,res)=>{
    const locals = {
        title : " NodeJs Blog",
        description:"Simple Blog Created with NodeJs ,Express & MongoDB"
    }
    try {
         await Post.deleteMany({title:"Discover how to use MongoDb"});
        const data = await Post.find();
        res.render('index',{locals,data});
    } catch (error) {
        console.log(error);
        
    }

    
});


router.get('/about',(req,res)=>{
    res.render('about')
})
module.exports = router;