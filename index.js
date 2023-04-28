require('dotenv').config();
const express = require('express'); 
const app = express(); 
const path = require('path');
const User = require("./server/models/user");
 
const userRoutes = require('./server/routes/user');
const postRoutes = require('./server/routes/post');
 
app.use(express.json()); 
app.use(express.static(__dirname+"/public"));
app.get('/', (req,res) => res.sendFile(path.join(__dirname, "/public/login.html")))

app.get("/users", async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use(function(req,res,next){ 
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"); 
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); 
    next(); 
});

app.use('/user', userRoutes); 
app.use('/post', postRoutes); 
 
const PORT = process.env.PORT || 3000; 
 
app.listen(PORT, () => console.log(`Server started on port ${PORT} !`));