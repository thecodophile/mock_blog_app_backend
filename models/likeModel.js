const mongoose = require("mongoose");

// route handler
const likeSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post", // reference the Post model
  },
  user: {
    type: String,
    required: true,
  },
});

// export
module.exports = mongoose.model("Like", likeSchema);
