# 📝 Node.js Blog Application  

A simple blog application built with **Node.js**, **Express**, **MongoDB**, and **EJS** templating.  
It allows users to register, log in, create posts, edit posts, and view blogs. Admins have access to a dashboard for managing posts.  

---

## 🚀 Features  
- User authentication (Login & Register)  
- Session management with MongoDB  
- Create, edit, delete blog posts  
- Admin dashboard for managing content  
- Search functionality  
- Light/Dark theme toggle (sun/moon icons included)  
- Responsive UI with **EJS layouts & partials**  

---

## 📂 Project Structure  

```
├── app.js                 # Main application file  
├── public/                # Static assets  
│   ├── css/style.css  
│   ├── images/  
│   └── js/script.js  
├── server/  
│   ├── config/db.js       # MongoDB connection  
│   ├── helpers/           # Helper functions  
│   ├── models/            # Mongoose models (User, Post)  
│   └── routes/            # Express routes (main, admin)  
├── views/                 # EJS templates  
│   ├── layouts/ (main, admin layouts)  
│   ├── auth/ (login, register)  
│   ├── admin/ (dashboard, add-post, edit-post)  
│   ├── partials/ (header, footer, search, etc.)  
│   └── index.ejs  
├── .gitignore  
├── package.json  
└── README.md  
```  

---

## ⚙️ Installation  

1. Clone the repository:  
   ```bash
   git clone https://github.com/your-username/nodejs-blog.git
   cd nodejs-blog
   ```

2. Install dependencies:  
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:  
   ```env
   MONGODB_URI=your_mongodb_connection_string
   SESSION_SECRET=your_secret
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Start the development server:  
   ```bash
   npm run dev
   ```
   (Runs with **nodemon**)  

5. Open in browser:  
   ```
   http://localhost:5000
   ```

---

## 📦 Dependencies  

- **express** - Web framework  
- **ejs** - Templating engine  
- **mongoose** - MongoDB ODM  
- **express-session** + **connect-mongo** - Session management  
- **jsonwebtoken** - JWT authentication  
- **bcrypt** - Password hashing  
- **dotenv** - Environment variables  
- **cookie-parser** - Parse cookies  
- **method-override** - Support for PUT/DELETE in forms  
- **nodemon** - Development hot reload  

---

## 🛠️ Usage  

- Visit `/register` to create a new account  
- Login at `/login`  
- Admin users can access `/dashboard`  
- Create or manage blog posts through the dashboard  
- Public users can read posts and search for content  
---

## 🖊️ License  

This project is licensed under the **MIT License**.  
