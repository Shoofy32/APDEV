const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const crypto = require("crypto");

const app = express();

app.use(cors());
app.use(express.json());


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
  tags: [String]
  
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
  unique_post_id: String
 
  
});


// Create the model for post and users
const Post = mongoose.model("Post", postSchema);
const User = mongoose.model("User", userSchema);

const Reply = mongoose.model("Reply", replySchema);


// ------ ------ User backend ------ ------
app.post("/register", async (req, res) => {
    
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
          return res.status(201).json({ success: true, message: "Registration successful!" });
        }

        else{
          return res.status(409).json({ success: false, message: "Username or email already exists." });
        }
        
    } catch (err) {
        console.error(err);
    }
});

app.post("/login", async (req,res) => {

  try {
    const {username, password} = req.body;

    const found = await User.find({ $and: [{username: username},{password: hash(password)}]});

    if(found){
      return res.status(201).json({success: true, message: "Login successful, welcome back!"});
    }
    else{
      return res.status(409).json({ success: false, message: "Incorrect username or password." });
    }
  }
  catch (err){
    console.error(err);
  }
});

function hash(password) {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
}

// ------ ------ Post backend ------ ------

// CREATE
app.post("/add-user", async (req, res) => {

    const {username, post_title,post_content, forum_name } = req.body;
    const newPost = new Post({ username,post_title, post_content, forum_name });
    await newPost.save();
    res.json({ message: "User added" });

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

// UPDATE
app.put("/update-user/:id", async (req, res) => {

    const { name, age } = req.body;
    await User.findByIdAndUpdate(req.params.id, { name, age });
    res.json({ message: "User updated" });

});

// CREATE
app.post("/add-post", async (req, res) => {
  const {username, post_title,post_content, forum_name } = req.body;
  const newPost = new Post({ username,post_title, post_content, forum_name });
  await newPost.save();
  res.json({ message: "User added" });
});

app.post("/add-reply", async (req, res) => {
  const {username, replying_to, original_content, reply_content, unique_post_id} = req.body;
  const newReply = new Reply({ username,replying_to, original_content, reply_content, unique_post_id });
  await newReply.save();
  res.json({ message: "Reply added" });
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



app.listen(5000, () => {

    console.log("Server running on port 5000");
    
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