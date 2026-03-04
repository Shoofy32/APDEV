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

// Schema
const postSchema = new mongoose.Schema({
  username: String,
  post_title: String,
  post_content: String,
  forum_name: String,
  tags: [String]
  
});

const Post = mongoose.model("Post", postSchema);

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

app.get("/user", async (req, res) => {
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
//Deleting for testing
app.get("/delete-all", async (req, res) => {
  await Post.deleteMany({});
  res.json({ message: "All posts deleted" });
});