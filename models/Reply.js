const mongoose = require('mongoose')

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
  total_dislikes: Number,
  poster_id: String  
 
  
});

const Reply = mongoose.model("reply", replySchema);
module.exports = Reply