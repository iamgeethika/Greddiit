const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        fname: String,
        lname: String,
        uname: String,
        email: String,
        age: Number,
        cno: String,
        password: String,
        followers: {
            type: Array,
            default: [],
        },
        following: {
            type: Array,
            default: [],
        },
        savedposts:{
            type: Array,
            default:[],
        },
    }
);

module.exports = User = mongoose.model("Users", UserSchema);