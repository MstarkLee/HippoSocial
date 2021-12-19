const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
var mongoose = require("mongoose");

const Post = require("../../models/Post");
const User = require("../../models/User");

// @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/posts
// @desc     Get all posts by user
// @access   Private
router.get("/:name", async (req, res) => {
  try {
    const posts = await Post.find({ name: req?.params?.name }).sort({
      date: -1,
    });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post(
  "/",
  check("text", "Text is required").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
      });

      await newPost.save();
      const posts = await Post.find().sort({ date: -1 });

      res.json(posts);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete("/:id/:name", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    await post.remove();
    const posts = await Post.find().sort({ date: -1 });

    res.json(posts);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
router.post(
  "/comment",
  check("text", "Text is required").notEmpty(),
  async (req, res) => {
    const commentId = req?.body?.commentId ?? null;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const thisPost = await Post.findById(req.body.id);

      const newComment = {
        text: req.body.text,
        name: req.body.name,
      };

      if (commentId) {
        const { comments } = thisPost;
        const targetIndex = comments?.findIndex(
          (item) => item._id.toString() === commentId.toString()
        );
        console.log(targetIndex);
        thisPost.comments[targetIndex].comments.unshift(newComment);
        await thisPost.save();
        return res.json(thisPost);
      }
      thisPost.comments.unshift(newComment);
      await thisPost.save();
      return res.json(thisPost);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.post("/comment/delete", async (req, res) => {
  try {
    const post = await Post.findById(req.body.postId);

    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.body.commentId
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }
    // Check user
    if (comment.name !== req.body.name) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    post.comments = post.comments.filter(({ id }) => id !== req.body.commentId);

    await post.save();
    const posts = await Post.find().sort({ date: -1 });

    return res.json(posts);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
