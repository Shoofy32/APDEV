const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

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
  
});

// User login and registration Schema
const userSchema = new mongoose.Schema({

    username: String,
    email: String,
    password: String
    
});


// Create the model for post and users
const Post = mongoose.model("Post", postSchema);
const User = mongoose.model("User", userSchema);



// ------ ------ User backend ------ ------
app.post("/register", async (req, res) => {
    console.log("Register route hit");
    try {
        const { email, username, password } = req.body;

        const newUser = new User({

              username: username,
              email: email,
              password: password

        });

        await newUser.save();

        res.status(201).send("User added successfully");
    } catch (err) {
        console.error(err);
    }
});



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


app.listen(5000, () => {

    console.log("Server running on port 5000");
    
});