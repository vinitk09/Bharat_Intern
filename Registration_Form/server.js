const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  return res.send("Hello From about page");
});

app.listen(8000, () => {
  console.log("Server Started");
});

app.post("/register", async (req, res) => {
  // Use app.post for handling registration

  const { name, email, password } = req.body;

  try {
    // Save user data to MongoDB
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).send("User registered successfully");
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).send("Internal server error");
  }
});

// connection
mongoose
  .connect("mongodb://127.0.0.1:27017/registration-form")
  .then(() => {
    console.log("MongoDb Connected");
  })
  .catch((err) => console.log("Connection Failed", err));

const userschema = new mongoose.Schema({
  name: {
    // Use lowercase 'name' instead of 'Name'
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
});

const User = mongoose.model("users", userschema);
