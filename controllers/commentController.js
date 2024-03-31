// import controller
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

// business logic
exports.createComment = async (req, res) => {
  try {
    // fetch data from req body
    const { post, user, body } = req.body;
    // create a Comment obj
    const comment = new Comment({ post, user, body });
    // save the new comment into the database
    const saveComment = await comment.save();

    // find the post by Id, add the new comment to its comments array
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      {
        $push: {
          comments: saveComment._id,
        },
      },
      { new: true }
    )
      .populate("comments")
      .exec();

    //   response
    res.status(200).json({
      success: true,
      updatedPost: updatedPost,
      message: "Comment created successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Error while creating comment",
    });
  }
};
