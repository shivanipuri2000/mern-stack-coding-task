const express = require("express");
const router = express.Router();
const path = require("path");
const app = express();
const blogs = require("../data/blogs");



router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/blog.html"));
});


router.get("/handler", (req, res) => {
  res.render("home");
});

router.get("/blogdata/:slug", (req, res) => {
  myBlog = blogs.filter((e) => {
    return e.slug == req.params.slug;
  });

  console.log(myBlog);
  blogs.forEach((e) => {
    console.log(e.title);
  });

  res.sendFile(path.join(__dirname, "../views/blogdata.html"));
});

module.exports = router;
