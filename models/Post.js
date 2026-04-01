const mongoose = require('mongoose')

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
  total_comments: Number,
  poster_id: String  
  
  
});


const Post = mongoose.model("Post", postSchema);
module.exports = Post