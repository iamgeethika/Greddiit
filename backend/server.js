const express = require("express");
const methodOverride = require("method-override");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(express.json());
require("./Userdetails");
const cors = require("cors");
const User = require("./Userdetails");
const Posts = require("./PostDetails");
const bcrypt = require("bcrypt");
const Cmnt = require("./CommentDetails");
const Rpt = require("./Report");
const saltrounds = 10;
app.use(express.json());
app.use(
    cors({
        origin: "*",
    })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://Armyyyy:Btsarmyat613@cluster0.zyak3xk.mongodb.net/dassassgn?retryWrites=true&w=majority");

const connection = mongoose.connection;
connection.once('open', function () {
    console.log("connected to mongodb");
})

app.post("/api/register", function (req, res) {
    User.findOne({ email: req.body.email1 }, function (e, exist) {
        if (exist) {
            return res.status(404).json({
                error: "user with same email exists",
            });
        }
    });
    bcrypt.hash(req.body.pwd1, saltrounds, function (err, hash) {
        const newUser = new User({
            fname: req.body.fname,
            lname: req.body.lname,
            uname: req.body.uname,
            email: req.body.email1,
            age: req.body.age,
            cno: req.body.cno,
            password: hash,
        });
        console.log(newUser);
        newUser.save()
            .then(user => {
                res.status(200).json({ user });
            })
            .catch(err => {
                console.log(err);
                res.status(400).send(err);
            });
    })
});

app.post("/api/login", (req, res) => {
    const email = req.body.email;
    User.findOne({ email }).then(user => {
        console.log("hello");
        console.log(email);
        if (!user) {
            console.log("hi");
            return res.status(404).json({
                error: "First Register",
            });
        }
        else {
            bcrypt.compare(req.body.pwd, user.password).then((match) => {
                console.log(req.body.pwd);
                console.log(user.password);
                console.log(match);
                if (match) {
                    return res.status(200).json(user);
                } else {
                    return res.status(404).json({
                        error: "Incorrect password",
                    });
                }
            })
        }
    })
}
);

app.put("/api/editprofile", (req, res) => {
    User.findOneAndUpdate({ email: req.body.email1 }, {
        fname: req.body.fname,
        lname: req.body.lname,
        uname: req.body.uname,
        age: req.body.age,
        cno: req.body.cno,
    }, { new: true, useFindAndModify: false }, function (err, val) {
        console.log(err)
        if (err) {
            return res.status(404).json({
                error: "Not found",
            });
        }
        else {
            return res.status(200).json(val)
        }
    });
});

app.get("/api/profile", (req, res) => {
    console.log(req.query);

    User.findOne({ email: req.query.email }).then((user) => {
        let person = user;
        if (!person) {

            return res.status(401).json({
                error: "user not Found",
            });
        } else {
            res.json(person);
        }
    });

});


app.put("/api/editfollowers", (req, res) => {
    User.findOneAndUpdate({ email: req.body.email }, {
        followers: req.body.followers,
    }, { new: true, useFindAndModify: false }, function (err, val) {
        console.log(err)
        if (err) {
            return res.status(404).json({
                error: "Not found",
            });
        }
        else {
            return res.status(200).json(val)
        }
    });
});

app.post("/api/mysubgreddit", (req, res) => {
    Posts.findOne({ email: req.body.email, name: req.body.name }).then((post) => {
        let p = post;
        if (!p) {
            const newPost = new Posts({
                email: req.body.email,
                desc: req.body.desc,
                name: req.body.name,
                tags: req.body.tags,
                bankeywor: req.body.bankeywor,
                users: req.body.users
            });
            newPost.save()
                .then(post => {
                    res.status(200).json(post);
                })
                .catch(err => {
                    res.status(400).send(err);
                });

        } else {
            return res.status(401).json({
                error: "greddit name already exists",
            });
        }
    });

    // console.log("hello");
});

app.put("/api/editfollowing", (req, res) => {
    User.findOneAndUpdate({ email: req.body.email }, {
        following: req.body.following,
    }, { new: true, useFindAndModify: false }, function (err, val) {
        console.log(err)
        if (err) {
            return res.status(404).json({
                error: "Not found",
            });
        }
        else {
            return res.status(200).json(val)
        }
    });
});


app.post("/api/getmygreddit", (req, res) => {
    const email = req.body.email;
    Posts.find({ email }).then(greddits => {
        if (!greddits) {
            res.status(400).send("Email not found");
        }
        else {
            res.status(200).json(greddits);
        }
    });
});


app.post("/api/getallgreddits", (req, res) => {
    Posts.find().then(greddits => {
        if (!greddits) {
            res.status(400).send("Email not found");
        }
        else {
            res.status(200).json(greddits);
        }
    });
});

app.get("/api/getmygredditname", (req, res) => {

    Posts.findOne({ email: req.query.email, name: req.query.name }).then((post) => {
        let p = post;
        if (!p) {

            return res.status(401).json({
                error: "user not Found",
            });
        } else {
            res.json(p);
        }
    });

});


app.get("/api/getmyreports", (req, res) => {
    Rpt.find({ subid: req.query.subid }).then((post) => {
        let p = post;
        if (!p) {

            return res.status(401).json({
                error: "user not Found",
            });
        } else {
            console.log(p);
            res.json(p);
        }
    });

});

app.get("/api/getallgredditname", (req, res) => {

    Posts.findOne({ _id: req.query._id }).then((post) => {
        let p = post;
        if (!p) {

            return res.status(401).json({
                error: "user not Found",
            });
        } else {
            res.json(p);
        }
    });

});

app.post("/api/subgredditdelete", function (req, res) {
    Posts.deleteOne({ name: req.body.name, email: req.body.email }, function (err, posts) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(req.body.name);
            res.status(200).json(posts);
        }
    })
});

app.post("/api/postdelete", function (req, res) {
    Cmnt.find({ subgredditid: req.body.id }).then(greddits => {
        if (!greddits) {
            res.status(400).send("posts not found");
        }
        else {
            Cmnt.deleteMany({ subgredditid: req.body.id }, function (err, post) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.status(200).json(post);
                }
            })
        }
    });
});
app.put("/api/editjoiningrequests", (req, res) => {
    Posts.findOneAndUpdate({ email: req.body.email, name: req.body.name }, {
        $pull: {
            joiningrequests: req.body.e,
        }
    }, { new: true, useFindAndModify: false }, function (err, val) {
        console.log(err)
        if (err) {
            return res.status(404).json({
                error: "Not found",
            });
        }
        else {
            return res.status(200).json(val)
        }
    });
});

app.put("/api/editjoiningrequests1", (req, res) => {

    Posts.findOne({ _id: req.body.id, leftusers: req.body.email }).then(post => {
        if (!post) {
            Posts.findOne({ _id: req.body.id, joiningrequests: req.body.email }).then(post1 => {
                if (!post1) {
                    Posts.findOneAndUpdate({ _id: req.body.id }, {
                        $push: {
                            joiningrequests: req.body.email,
                        }
                    }, { new: true, useFindAndModify: false }, function (err, val) {
                        console.log(err)
                        if (err) {
                            return res.status(404).json({
                                error: "Not found",
                            });
                        }
                        else {
                            return res.status(200).json(val)
                        }
                    });
                }
                else {
                    return res.status(404).json({
                        error: "join request already sent",
                    });
                }
            });
        }
        else {
            return res.status(404).json({
                error: "Cannot join as you left the greddit",
            });
        }
    });
});

app.put("/api/editusers", (req, res) => {
    Posts.findOneAndUpdate({ email: req.body.email, name: req.body.name }, {
        $push: {
            users: req.body.e,
        }
    }, { new: true, useFindAndModify: false }, function (err, val) {
        console.log(err)
        if (err) {
            return res.status(404).json({
                error: "Not found",
            });
        }
        else {
            return res.status(200).json(val)
        }
    });
});

app.put("/api/editusers1", (req, res) => {
    Posts.findOneAndUpdate({ email: req.body.email, name: req.body.name }, {
        $pull: {
            users: req.body.e,
        }
    }, { new: true, useFindAndModify: false }, function (err, val) {
        console.log(err)
        if (err) {
            return res.status(404).json({
                error: "Not found",
            });
        }
        else {
            return res.status(200).json(val)
        }
    });
});

app.put("/api/editbusers", (req, res) => {
    Posts.findOne({ email: req.body.email, name: req.body.name, blockedusers: req.body.e }).then(post => {
        if (!post) {
            Posts.findOneAndUpdate({ email: req.body.email, name: req.body.name }, {
                $push: {
                    blockedusers: req.body.e,
                }
            }, { new: true, useFindAndModify: false }, function (err, val) {
                console.log(err)
                if (err) {
                    return res.status(404).json({
                        error: "Not found",
                    });
                }
                else {
                    return res.status(200).json(val)
                }
            });
        }
        else {
            return res.status(404).json({
                error: "already blocked",
            });
        }
    });

});

app.put("/api/editusers2", (req, res) => {
    Posts.findOneAndUpdate({ _id: req.body.id }, {
        $pull: {
            users: req.body.e,
        }
    }, { new: true, useFindAndModify: false }, function (err, val) {
        console.log(err)
        if (err) {
            return res.status(404).json({
                error: "Not found",
            });
        }
        else {
            return res.status(200).json(val)
        }
    });
});

app.put("/api/editleftusers", (req, res) => {
    Posts.findOneAndUpdate({ _id: req.body.id }, {
        $push: {
            leftusers: req.body.e,
        }
    }, { new: true, useFindAndModify: false }, function (err, val) {
        console.log(err)
        if (err) {
            return res.status(404).json({
                error: "Not found",
            });
        }
        else {
            return res.status(200).json(val)
        }
    });
});

app.put("/api/updateposts", (req, res) => {
    Posts.findOneAndUpdate({ _id: req.body.id }, {
        posts: req.body.posts
    }, { new: true, useFindAndModify: false }, function (err, val) {
        console.log(err)
        if (err) {
            return res.status(404).json({
                error: "Not found",
            });
        }
        else {
            return res.status(200).json(val)
        }
    });
});

app.post("/api/mypost", (req, res) => {
    // console.log("hello");
    const newCmnt = new Cmnt({
        subgredditid: req.body.subid,
        postedby: req.body.postedby,
        postedin: req.body.postedin,
        text: req.body.text,
    });
    newCmnt.save()
        .then(post => {
            res.status(200).json(post);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

app.post("/api/myreport", (req, res) => {
    // console.log("hello");
    const newRpt = new Rpt({
        subid: req.body.subid,
        postid: req.body.postid,
        reportedby: req.body.reportedby,
        reportedon: req.body.reportedon,
        concern: req.body.concern,
        posttext: req.body.text,
    });
    newRpt.save()
        .then(report => {
            res.status(200).json(report);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

app.post("/api/getmyposts", (req, res) => {
    console.log("hi");
    const E = [];
    Cmnt.find({ subgredditid: req.body.subid }).then(posts => {
        if (!posts) {
            res.status(400).send("Posts not found");
        }
        else {
            Posts.findOne({ _id: req.body.subid }).then(greddit => {
                const b = greddit.blockedusers;
                console.log(b);
                if (greddit.email === req.body.email) {
                    E.push(posts);
                    res.status(200).json(E);
                }
                else {
                    let p = posts;
                    for (let index = 0; index < p.length; index++) {
                        if (b.includes(p[index].postedby)) {
                            p[index].postedby = "Blocked User"
                        }
                        console.log("e");
                    }
                    E.push(p);
                    console.log(E);
                    res.status(200).json(E);
                }
            });
        }
    });
});


app.put("/api/editupvotes", (req, res) => {
    Cmnt.findOne({ _id: req.body.id, upvotes: req.body.email }).then(post => {
        if (!post) {
            Cmnt.findOneAndUpdate({ _id: req.body.id }, {
                $push: {
                    upvotes: req.body.email,
                }
            }, { new: true, useFindAndModify: false }, function (err, val) {
                console.log(err)
                if (err) {
                    return res.status(404).json({
                        error: "Not found",
                    });
                }
                else {
                    return res.status(200).json(val)
                }
            });
        }
        else {
            return res.status(404).json({
                error: "already liked the post",
            });
        }
    });

});

app.put("/api/editdownvotes", (req, res) => {
    Cmnt.findOne({ _id: req.body.id, downvotes: req.body.email }).then(post => {
        if (!post) {
            Cmnt.findOneAndUpdate({ _id: req.body.id }, {
                $push: {
                    downvotes: req.body.email,
                }
            }, { new: true, useFindAndModify: false }, function (err, val) {
                console.log(err)
                if (err) {
                    return res.status(404).json({
                        error: "Not found",
                    });
                }
                else {
                    return res.status(200).json(val)
                }
            });
        }
        else {
            return res.status(404).json({
                error: "already disliked the post",
            });
        }
    });
});

app.put("/api/editfollowers1", (req, res) => {
    User.findOne({ email: req.body.person2, followers: req.body.person1, }).then(user => {
        if (!user) {
            console.log("hello");
            User.findOneAndUpdate({ email: req.body.person2 }, {
                $push: {
                    followers: req.body.person1,
                }
            }, { new: true, useFindAndModify: false }, function (err, val) {
                console.log(err)
                if (err) {
                    return res.status(404).json({
                        error: "Not found",
                    });
                }
                else {
                    return res.status(200).json(val)
                }
            });
        }
        else {
            console.log(user);
            return res.status(404).json({
                error: "already following",
            });
        }
    });
});

app.put("/api/editfollowing1", (req, res) => {
    User.findOne({ email: req.body.person1, following: req.body.person2, }).then(user => {
        if (!user) {
            User.findOneAndUpdate({ email: req.body.person1 }, {
                $push: {
                    following: req.body.person2,
                }
            }, { new: true, useFindAndModify: false }, function (err, val) {
                console.log(err)
                if (err) {
                    return res.status(404).json({
                        error: "Not found",
                    });
                }
                else {
                    return res.status(200).json(val)
                }
            });
        }
        else {
            return res.status(404).json({
                error: "already following",
            });
        }
    });
});

app.put("/api/editsavedposts", (req, res) => {
    User.findOne({ email: req.body.email, savedposts: req.body.id }).then(user => {
        if (!user) {
            console.log("hello");
            User.findOneAndUpdate({ email: req.body.email }, {
                $push: {
                    savedposts: req.body.id
                }
            }, { new: true, useFindAndModify: false }, function (err, val) {
                console.log(err)
                if (err) {
                    return res.status(404).json({
                        error: "Not found",
                    });
                }
                else {
                    console.log("hi");
                    return res.status(200).json(val)
                }
            });
        }
        else {
            console.log(user);
            return res.status(404).json({
                error: "already saved",
            });
        }
    });

});

app.post("/api/getmysavedposts", (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
        if (!user) {
            res.status(400).send("user not found");
        }
        else {
            res.status(200).json(user);
        }
    });
});

app.post("/api/getmysavedposts1", (req, res) => {
    Cmnt.find({ _id: { $in: req.body.ids } }).then(posts => {
        if (!posts) {
            res.status(400).send("Posts not found");
        }
        else {
            res.status(200).json(posts);
        }
    });
});

app.post("/api/getmyreportedposts", (req, res) => {
    Cmnt.find({ _id: { $in: req.body.ids } }).then(posts => {
        if (!posts) {
            res.status(400).send("Posts not found");
        }
        else {
            res.status(200).json(posts);
        }
    });
});

app.post("/api/deletesavedposts", function (req, res) {
    User.findOneAndUpdate({ email: req.body.email }, {
        $pull: {
            savedposts: req.body.id
        }
    }, { new: true, useFindAndModify: false }, function (err, val) {
        console.log(err)
        if (err) {
            return res.status(404).json({
                error: "Not found",
            });
        }
        else {
            return res.status(200).json(val)
        }
    });
});

app.put("/api/editcomments", (req, res) => {
    Cmnt.findOneAndUpdate({ _id: req.body.id }, {
        $push: {
            comments: req.body.text,
        }
    }, { new: true, useFindAndModify: false }, function (err, val) {
        console.log(err)
        if (err) {
            console.log("hello");
            return res.status(404).json({
                error: "Not found",
            });
        }
        else {
            console.log(val);
            return res.status(200).json(val)
        }
    });
});

app.post("/api/editreports", function (req, res) {
    Rpt.deleteMany({ postid: req.body.id }, function (err, posts) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(req.body.name);
            res.status(200).json(posts);
        }
    })
});

app.post("/api/editposts", function (req, res) {
    Cmnt.deleteOne({ _id: req.body.id }, function (err, posts) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(req.body.name);
            res.status(200).json(posts);
        }
    })
});

app.post("/api/ignore", function (req, res) {
    Rpt.findOneAndUpdate({ _id: req.body.id }, {
        Ignore: true,
    }, { new: true, useFindAndModify: false }, function (err, val) {
        console.log(err)
        if (err) {
            return res.status(404).json({
                error: "Not found",
            });
        }
        else {
            return res.status(200).json(val)
        }
    });
});

app.listen(5000, function () {
    console.log("server started on local host 5000")
}); 