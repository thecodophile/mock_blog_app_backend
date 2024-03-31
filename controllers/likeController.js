const Post = require("../models/postModel");
const Like = require("../models/likeModel");

// Like a post
exports.likePost = async (req, res) => {
  try {
    const { post, user } = req.body;
    const like = new Like({
      post,
      user,
    });
    const saveLike = await like.save();

    // update post collection basis on this
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { likes: saveLike._id } },
      { new: true }
    )
      .populate("likes")
      .populate("comments")
      .exec();

    res.status(200).json({
      success: true,
      updatedPost: updatedPost,
      message: "Like created successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Error while creating like",
    });
  }
};

// unlike a post
exports.unLikePost = async (req, res) => {
  try {
    const { post, like } = req.body;

    //   find and delete from the like collection
    const deleteLike = await Like.findOneAndDelete({ post: post, _id: like });

    // update post collection basis on this
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $pull: { likes: deleteLike._id } },
      { new: true }
    );
    res.status(200).json({
      success: true,
      updatedPost: updatedPost,
      message: "Unlike created successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Error while creating unlike",
    });
  }
};
