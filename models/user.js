const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    bio: String,
    likes: Number,
    profile: String,
    banner: String,
    posts: [String],
    replies: [String],
    notifs: [String],
    wins: Number,
    losses: Number,
    ties: Number,
    liked_posts_id : [String],
    liked_replies_id : [String],
    disliked_posts_id : [String],
    disliked_replies_id : [String]
    
});

const User = mongoose.model("User", userSchema);
module.exports = User