const express = require("express");
const mongoose = require("mongoose");
const articleRouter = require("./routes/articles");
const path = require("path");
const Article = require("./models/article"); // Corrected import
const methodOverride = require("method-override");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: false })); // Add this line to parse form data
app.use(methodOverride("_method")); // Corrected method override setup

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/Blogs");

app.use("/articles", articleRouter);
// Define routes
app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles: articles });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
