const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
    {
        subgredditid: String,
        postedby: String,
        postedin: String,
        text: String,
        upvotes: {
            type: Array,
            default: [],
        },
        downvotes: {
            type: Array,
            default: [],
        },
        comments: {
            type: Array,
            default: [],
        },
    }
);

module.exports = Cmnt = mongoose.model("Cmnts", CommentSchema);