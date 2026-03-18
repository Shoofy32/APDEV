//all the stuff we're gonna need
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const crypto = require("crypto");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded( {extended: true})); // files consist of more than strings

const path = require("path");

app.use(express.static(path.join(__dirname)));

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

app.get("/forum", (req,res)=> {

    res.sendFile(__dirname + "/html/forum.html");
    
});

//dummy route, you can change the hbs file this leads to
app.get("/profile", isAuthenticated, (req, res) =>{

    res.sendFile(__dirname + "/html/userprofile.html");

});

app.get("/userpost", isAuthenticated, (req, res) =>{

    res.sendFile(__dirname + "/html/userpost.html");
    
});

app.get("/userprofile", isAuthenticated, (req, res) =>{

    res.sendFile(__dirname + "/html/userprofile.html");
    
});

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/myapp")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));



// Schemas
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


//Models
const Post = mongoose.model("Post", postSchema);
const User = mongoose.model("User", userSchema);
const Reply = mongoose.model("Reply", replySchema);


// ------------- Obtain Login Info ---------------
app.get("/user-login", (req, res) => {

    if(req.session.user)
        res.json({user: req.session.user, userLoggedIn: true});
    else
        res.json({userLoggedIn: false});      

});


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
              likes: 20

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
          res.redirect("/");
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
          return res.status(201).json({ success: false, message: broken});
        }
        res.redirect("/");
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
    // Changes so that it will redirect user to the page where they logged out. Also added /login if redirect fails
    res.redirect(req.headers.referer || "/login"); 

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



//READ
app.get("/posts/:page", async (req, res) => {
  const page = parseInt(req.params.page);
  const limit = 15;

  try {
    const posts = await Post.find({})
      .sort({_id: -1})
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get("/replies/:postId/:page", async (req, res) => {
  const page = parseInt(req.params.page);
  const postId = req.params.postId;
  const limit = 15;

  try {
    const replies = await Reply.find({unique_post_id: postId})
      .sort({_id: 1})
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json(replies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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


//UPDATE
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

//DELETE
app.delete("/post/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    const result = await Reply.deleteMany({ unique_post_id: req.params.id });
    
   
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

app.put("/update-user/:id", async (req, res) => {

    const { name, age } = req.body;
    await User.findByIdAndUpdate(req.params.id, { name, age });
    res.json({ message: "User updated" });

});



//DEBUGGING TO DELETE ALL
app.get("/delete-all", async (req, res) => {
  await Post.deleteMany({});
  await Reply.deleteMany({})
  res.json({ message: "All posts deleted" });
});

app.get("/delete-all-rep", async (req, res) => {
  
  await Reply.deleteMany({})
  res.json({ message: "All posts deleted" });
});




// NEW: User Updating route
app.put("/user-update", async (req, res) => {

    try {
        
        const {newBio, newLikes} = req.body;
        const username = req.session.user.username;

        let updatedInfo = {};

        // Check if requested bio has data or not
        if(newBio !== undefined){

            req.session.user.bio = newBio; // Update session
            updatedInfo.bio = newBio;

        }

        // Check if requested likes has data or not
        if(newLikes !== undefined){

            req.session.user.likes = newLikes; // Update session
            updatedInfo.likes = newLikes;


        }

        // Find user in database and update likes
        await User.findOneAndUpdate(
            
            {username: username},
            {$set: updatedInfo}

        );

        // Force immideiate save of data
        req.session.save((err) => {

            if (err) 
                res.status(500).json({ error: err.message });
            else
                res.json({ message: "Successful Update"});

        });

    } catch (err) {

        res.status(500).json({ error: err.message }); // Send error of PUT request

    }


});




app.listen(3000, () => {

    console.log("Server running on port 3000");
    
});


