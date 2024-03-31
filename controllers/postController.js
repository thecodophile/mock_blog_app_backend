const Post = require("../models/postModel");

exports.createPost = async (req, res) => {
  try {
    const { title, body } = req.body;

    const post = new Post({
      title,
      body,
    });

    const savePost = await post.save();

    res.status(200).json({
      success: true,
      post: savePost,
      message: "Post created successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Error while creating post",
    });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("likes")
      .populate("comments")
      .exec();

    res.status(200).json({
      success: true,
      post: posts,
      message: "All posts fetched successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Error while fetching posts",
    });
  }
};
