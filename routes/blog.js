const express = require("express");
const router = express.Router();

// inport controller
const { createComment } = require("../controllers/CommentController");
const { createPost, getAllPosts } = require("../controllers/PostController");
const { likePost, unLikePost } = require("../controllers/LikeController");

// maping create
router.post("/comment/create", createComment);
router.post("/post/create", createPost);
router.get("/posts", getAllPosts);
router.post("/likes/like", likePost);
router.post("/likes/unlike", unLikePost);

// export
module.exports = router;
