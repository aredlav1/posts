const express = require("express");
const User = require("../models/post");
const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const posts = await post.getAllPosts();
    res.send(posts);
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
});
router.put("/edit", async (req, res) => {
  try {
    let post = await post.editPosts(req.body);
    res.send({ ...post });
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    post.deletePost(req.body);
    res.send({ success });
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
});
module.exports = router;
