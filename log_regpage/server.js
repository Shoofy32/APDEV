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
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
  
});

const User = mongoose.model("User", userSchema);

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

app.listen(5000, () => {
  console.log("Server running on port 5000");
});