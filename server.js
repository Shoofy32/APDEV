//all the stuff we're gonna need
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const crypto = require("crypto");
const hbs = require("hbs");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded( {extended: true})); // files consist of more than strings

const path = require("path");

app.use(express.static(path.join(__dirname)));

app.set('view engine', 'hbs');

//Session objects
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    /*cookie: { 
      secure: false, 
      httpOnly: true, 
      maxAge: 24 * 60 * 60 * 1000
    }*/
  })
);

app.use(cookieParser())

//authentication checker
const isAuthenticated = (req,res,next) => {
  if(req.session.user) {
    console.log("authenticated");
    next();
  }
  else{
    console.log("wadahel");
    res.redirect('/login');
  }   
}

//webpage routing
app.get('/login', (req,res) =>{
  if (req.session.user){
    res.redirect("/");
  }
  else{
    res.sendFile(__dirname + "/html/login.html")
  }
});

app.get('/register', (req,res)=> {
  if (req.session.user){
    res.redirect("/");
  }
  else{
    res.sendFile(__dirname + "/html/registration.html")
  }
});

app.get("/", (req,res)=> {
  res.sendFile(__dirname + "/html/homepage.html");
});

app.get("/regErr", (req,res) => {
  res.sendFile(__dirname + "/html/regErr.html");
});

app.get("/logErr", (req,res)=> {
  res.sendFile(__dirname + "/html/logErr.html");
});

//dummy route, you can change the hbs file this leads to
app.get("/profile", isAuthenticated, (req, res) =>{
  console.log("session started");
  const userData = req.session.user;
  res.render('user',{userData});
});

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/myapp")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));



// Post Schema
const postSchema = new mongoose.Schema({
  username: String,
  post_title: String,
  post_content: String,
  forum_name: String,
  tags: [String],
  total_likes : Number,
  is_edited :Boolean,
  date: String,
  total_dislikes: Number,
  total_comments: Number
  
  
});

const likedPosts = new mongoose.Schema({
  username: String,
  liked_posts_id : [String]
});

// User login and registration Schema
const userSchema = new mongoose.Schema({

    username: String,
    email: String,
    password: String,
    bio: String,
    likes: Number
    
});

const replySchema = new mongoose.Schema({
  username: String,
  replying_to: String,
  original_content:String,
  reply_content: String,
  unique_post_id: String,
  total_likes: Number,
  is_edited: Boolean,
  parent_reply_id: String,
  date: String,
  total_dislikes: Number
 
  
});


// Create the model for post and users
const Post = mongoose.model("Post", postSchema);
const User = mongoose.model("User", userSchema);
const Reply = mongoose.model("Reply", replySchema);


// ------ ------ User backend ------ ------
app.post("/registerUser", async (req, res) => {
    
    try {
        const { email, username, password } = req.body;

        const found = await User.findOne({ $or: [{ username: username }, { email: email }] });

        if (!found){
          const newUser = new User({

              username: username,
              email: email,
              password: hash(password),
              bio: "Describe yourself...",
              likes: 0

          });

          await newUser.save();
          //assigning session user
          req.session.user = {
            username: newUser.username,
            email: newUser.email,
            bio: newUser.bio,
            likes: newUser.likes
          };
          
          //saving session info
         req.session.save((err)=>{
          if (err) {
            console.log("broken");
            return res.status(409).json({ success: false, message: "broken" });
          }
          res.redirect("/profile");
        });     

        }
        else{
          res.redirect("/regErr");
        }
        
    } catch (err) {
        console.error(err);
    }
});

app.post("/logUser", express.urlencoded({extended: true}), async (req, res) => {

  try {
    const {username, password} = req.body;
    console.log(username);
    console.log(password);
    const found = await User.findOne({ $and: [{username: username},{password: hash(password)}]});

    if(found){
      req.session.user = {
            username: found.username,
            email: found.email,
            bio: found.bio,
            likes: found.likes
      };
      console.log(req.session.user);
      req.session.save((err)=>{
        if (err) {
          console.log("broken");
          res.redirect("/profile");
        }
        return res.status(201).json({ success: true});
      });     
    }
    else{
      res.redirect("/logErr");
    }
  }
  catch (err){
    console.error(err);
  }
});

//hashing function for passwords
function hash(password) {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
}

//log out route
app.get("/logout", (req,res)=>{
  req.session.destroy(() =>{
  res.clearCookie("sessionId");
  res.redirect("/login");
  });
})

// ------ ------ Post backend ------ ------s
// CREATE
app.post("/add-post", async (req, res) => {

  const {username, post_title,post_content, forum_name, tags, 
    total_likes, is_edited,date, total_dislikes, total_comments } = req.body;


  const newPost = new Post({ username,post_title, post_content, forum_name, tags, 
    total_likes, is_edited,date, total_dislikes, total_comments});

    
  console.log(res)
  await newPost.save();
  
  res.json({ message: "User added" });
});

app.post("/add-reply", async (req, res) => {
  console.log("req.body:", req.body);
  const {username, replying_to, original_content, reply_content, unique_post_id, total_likes, is_edited, 
    parent_reply_id, date,total_dislikes} = req.body;
  const newReply = new Reply({ username,replying_to, original_content, reply_content, unique_post_id, total_likes, 
    is_edited, parent_reply_id,date, total_dislikes});
  await newReply.save();
  res.json({ message: "Reply added" });
});


// READ
app.get("/users", async (req, res) => {

    const users = await Post.find();
    res.json(users);

});

// DELETE
app.delete("/delete-user/:id", async (req, res) => {

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });

});

app.delete("/post/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.delete("/reply/:id", async (req, res) => {
  try {
    await Reply.findByIdAndDelete(req.params.id);
    res.json({ message: "Reply deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
app.put("/update-user/:id", async (req, res) => {

    const { name, age } = req.body;
    await User.findByIdAndUpdate(req.params.id, { name, age });
    res.json({ message: "User updated" });

});

app.put("/post/:id", async (req, res) => {
  try {
    const { post_content, is_edited, total_likes } = req.body;

    const updateFields = {};
    if (post_content !== undefined) updateFields.post_content = post_content;
    if (is_edited !== undefined)    updateFields.is_edited = is_edited;
    if (total_likes !== undefined)  updateFields.total_likes = total_likes;

    await Post.findByIdAndUpdate(req.params.id, { $set: updateFields });

    // ONE cascade only
    if (post_content !== undefined) {
      await Reply.updateMany(
        { unique_post_id: req.params.id },
        { $set: { original_content: post_content + " (edited)" } } // always edited if content changed
      );
    }

    res.json({ message: "Post updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Update likes
app.put("/post/:id/likes", async (req, res) => {
  try {
    const { increment } = req.body; 

    await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { total_likes: increment } } 
    );

    res.json({ message: "Likes updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Update dislikes
app.put("/post/:id/dislikes", async (req, res) => {
  try {
    const { increment } = req.body; 

    await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { total_dislikes: increment } } 
    );

    res.json({ message: "Likes updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/post/:id/total_comments", async (req, res) => {
  try {
    const { increment } = req.body; 

    await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { total_comments: increment } } 
    );

    res.json({ message: "Likes updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/reply/:id", async (req, res) => {
  try {
    const { reply_content, is_edited, original_content } = req.body;

    await Reply.findByIdAndUpdate(
      req.params.id,
      { $set: { reply_content, is_edited, original_content } }
    );

    // ONE cascade only
    await Reply.updateMany(
      { parent_reply_id: req.params.id },
      { $set: { original_content: reply_content + " (edited)" } }
    );

    res.json({ message: "Reply updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/reply/:id/likes", async (req, res) => {
  try {
    const { increment } = req.body; 

    await Reply.findByIdAndUpdate(
      req.params.id,
      { $inc: { total_likes: increment } } 
    );

    res.json({ message: "Likes updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/reply/:id/dislikes", async (req, res) => {
  try {
    const { increment } = req.body; 

    await Reply.findByIdAndUpdate(
      req.params.id,
      { $inc: { total_dislikes: increment } } 
    );

    res.json({ message: "dislikes updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// READ
app.get("/posts", async (req, res) => {
  const users = await Post.find();
  res.json(users);
});
app.get("/replies", async (req, res) => {
  const users = await Reply.find();
  res.json(users);
});

app.get("/replies/:postId", async (req, res) => {

  const postId = req.params.postId;

  const replies = await Reply.find({ unique_post_id: postId });

  res.json(replies);

});
app.get("/post/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/reply/:id", async (req, res) => {
  try {
    const post = await Reply.findById(req.params.id);
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(3000, () => {

    console.log("Server running on port 3000");
    
});

app.get("/delete-all", async (req, res) => {
  await Post.deleteMany({});
  await Reply.deleteMany({})
  res.json({ message: "All posts deleted" });
});

app.get("/delete-all-rep", async (req, res) => {
  
  await Reply.deleteMany({})
  res.json({ message: "All posts deleted" });
});

