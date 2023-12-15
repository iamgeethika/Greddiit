const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        email: String,
        name: String,
        desc: String,
        tags: Array,
        bankeywor: Array,
        users: {
            type: Array,
            default: [],
        },
        joiningrequests: {
            type: Array,
            default: [],
        },
        blockedusers: {
            type: Array,
            default: [],
        },
        leftusers: {
            type: Array,
            default: [],
        },
        posts: {
            type: Number,
            default: 0,
        },
        created : { type: Date, default: Date.now }
    }
);

module.exports = Post = mongoose.model("Posts", PostSchema);