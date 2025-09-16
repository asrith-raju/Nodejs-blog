const express = require('express')
const router = express.Router()
const Post = require('../models/post.js');
const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { route } = require('./admin.js');

const adminLayout = '../views/layouts/admin'
jwtSecret = process.env.JWT_SECRET;

// CHECK - LOGIN
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
}



// Middleware: Redirect logged-in users away from login/register
// const redirectIfAuth = (req, res, next) => {
//   const token = req.cookies.token;

//   if (token) {
//     try {
//       jwt.verify(token, jwtSecret);  // check if token is valid
//       return res.redirect('/dashboard'); // already logged in → go to dashboard
//     } catch (err) {
//       return next(); // invalid token → allow access to login/register
//     }
//   }

//   next(); // no token → continue normally
// };







// GET 
// Admin-LOGIN PAGE 

router.get('/admin', async (req, res) => {
    try {
        const locals = {
            title: "Admin",
            description: "Simple Blog Created with NodeJs ,Express & MongoDB"
        }
        const data = await Post.find();
        res.render('admin/index', { locals, layout: adminLayout });
    } catch (error) {
        console.log(error);

    }
});

// POSt
// Admin- Check LOGIN PAGE 


router.post('/admin', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'invalid credentials' })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'invalid credentials' })
        }

        const token = jwt.sign({ userId: user._id }, jwtSecret);
        res.cookie('token', token, { httpOnly: true });

        res.redirect('/dashboard')



    } catch (error) {
        console.log(error);

    }
});

// Get
// Admin-Dashboard


router.get('/dashboard', authMiddleware, async (req, res) => {

    try {
        const locals = {
            title: "Admin",
            description: "Simple Blog Created with NodeJs ,Express & MongoDB"
        }


        const data = await Post.find();
        res.render('admin/dashboard', {
            locals,
            data,
            layout: adminLayout
        });

    } catch (error) {
        console.log(error);

    }



});

// Get
// Admin-Create New Post

router.get('/add-post', authMiddleware, async (req, res) => {

    try {
        const locals = {
            title: "Add Post",
            description: "Simple Blog Created with NodeJs ,Express & MongoDB"
        }

        const data = await Post.find();
        res.render('admin/add-post', {
            locals,
            layout: adminLayout
        });

    } catch (error) {
        console.log(error);

    }
});


// Get
// Admin-Create New Post

router.post('/add-post', authMiddleware, async (req, res) => {

    try {
        console.log(req.body);

        try {
            const newPost = new Post({
                title: req.body.title,
                body: req.body.body,
                user:req.userId
            })
            await Post.create(newPost)
            await newPost.save()
            res.redirect('/dashboard');

        } catch (error) {
            console.log(error);

        }

    } catch (error) {
        console.log(error);

    }
});

// GET
// Admin-Create New Post

router.get('/edit-post/:id', authMiddleware, async (req, res) => {

    try {
        const locals = {
            title: "Edit Post",
            description: "Simple Blog Created with NodeJs ,Express & MongoDB"
        }
        const data = await Post.findOne({ _id: req.params.id })
        res.render('admin/edit-post', {
            locals,
            data,
            layout: adminLayout
        })

    } catch (error) {
        console.log(error);

    }
});


// PUT
// Admin-Create New Post

router.put('/edit-post/:id', authMiddleware, async (req, res) => {

    try {
        await Post.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            body: req.body.body,
            updatedAt: Date.now()
        })
        res.redirect(`/edit-post/${req.params.id}`)

    } catch (error) {
        console.log(error);

    }
});




// DELETE
// Admin-Delete Post
router.delete('/delete-post/:id', authMiddleware, async (req, res) => {
   try {
    await Post.deleteOne({ _id:req.params.id})
    res.redirect('/dashboard')
   } catch (error) {
    console.log(error);
   }

});

// GET - Register Page
// router.get('/register', redirectIfAuth, (req, res) => {
//   try {
//     const locals = {
//       title: "Register",
//       description: "Create your account"
//     };

//     res.render('auth/register', { 
//       locals, 
//       layout: adminLayout 
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Error loading register page");
//   }
// });





// POST
// Admin - Register

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const user = await User.create({ username, password: hashedPassword });
            res.status(201).json({ message: 'user created', user })
            res.redirect('/login')
        } catch (error) {
            if (error.code === 11000) {
                res.status(409).json({ message: 'user already in use' })
            }
            res.status(500).json({ message: 'internal server error' })
        }

    } catch (error) {
        console.log(error);

    }
});



// POST - Register new user









// GET - Login Page
// router.get('/login', redirectIfAuth, (req, res) => {
//   try {
//     const locals = {
//       title: "Login",
//       description: "Access your account"
//     };

//     res.render('auth/login', { 
//       locals, 
//       layout: adminLayout 
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Error loading login page");
//   }
// });


// POST - Handle Login
// router.post('/login', async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // Check if user exists
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(401).send("Invalid credentials");
//     }

//     // Compare password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).send("Invalid credentials");
//     }

//     // Create JWT
//     const token = jwt.sign({ userId: user._id }, jwtSecret);

//     // Set cookie
//     res.cookie('token', token, { httpOnly: true });

//     // Redirect to dashboard
//     res.redirect('/dashboard');

//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Error logging in");
//   }
// });


// Get 
// // Admin-Logout
router.get('/logout',(req,res)=>{
    res.clearCookie('token')
    // res.json({message: 'Logout Successful'})
    res.redirect('/')
})
module.exports = router;