import React from 'react';
import { useParams } from 'react-router-dom';
import Dashboard from './Dashboard';
import { useState } from 'react';
import axios from 'axios';
import { Card, CardActions, CardContent, CardHeader, DialogContent, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import ReportIcon from '@mui/icons-material/Report';
import { useNavigate } from 'react-router-dom';


export default function Greddit() {
    const navigate = useNavigate();
    const id = useParams();
    const email = localStorage.getItem('email');
    const [nam, setnam] = useState("");
    const [nam1, setnam1] = useState("");
    const [desc, setdesc] = useState("");
    const [users, setusers] = useState([]);
    const [busers, setbusers] = useState([]);
    const [ban, setban] = useState([]);
    const [text, settext] = useState("");
    const [open, setOpen] = useState(false);
    const [posts, setposts] = useState([]);
    const [open1, setOpen1] = useState(false);
    const [text1, settext1] = useState("");
    const [open2, setOpen2] = useState(false);
    const [ch, setch] = useState(false);
    const [concern, setconcern] = useState("");
    const [p, setp] = useState(0);
    const [ids, setid] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen1 = () => {
        setOpen1(true);
    };

    const handleClose1 = () => {
        setOpen1(false);
    };

    const handleClickOpen2 = () => {
        setOpen2(!open2);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };

    useEffect(() => {
        axios.get('/api/getallgredditname', { params: { _id: id.id } })
            .then(res => {
                setusers(res.data.users);
                setnam(res.data.name);
                setnam1(res.data.email);
                setdesc(res.data.desc);
                setban(res.data.bankeywor);
                setbusers(res.data.blockedusers);
                setp(res.data.posts)
                setid(res.data._id);
                console.log(res.data);
            })
            .catch(error => {
                console.log(error)
            });
        axios
            .post("/api/getmyposts", { subid: id.id, email: email })
            .then((res) => {
                setposts(res.data[0]);
                console.log(res.data[0]);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function func1(ind) {
        console.log(posts[ind]._id);
        axios
            .put("/api/editupvotes", { email: email, id: posts[ind]._id })
            .then((response) => {
                console.log(response.data);
                window.location.reload();
            })
            .catch((error) => {
                alert("already liked the post")
            });
    }

    function func2(ind) {
        console.log(posts[ind]._id);
        axios
            .put("/api/editdownvotes", { email: email, id: posts[ind]._id })
            .then((response) => {
                console.log(response.data);
                window.location.reload();
            })
            .catch((error) => {
                alert("already disliked the post")
            });
    }

    function func3(ind) {
        if (email === posts[ind].postedby) {
            alert("you can't follow yourself");
        }
        else {
            axios
                .put("/api/editfollowers1", { person1: email, person2: posts[ind].postedby })
                .then((response) => {
                    console.log(response.data);
                    window.location.reload();
                })
                .catch((error) => {
                    alert("already following");
                    console.log(error);
                });
            axios
                .put("/api/editfollowing1", { person1: email, person2: posts[ind].postedby })
                .then((response) => {
                    console.log(response.data);
                    window.location.reload();
                })
                .catch((error) => {
                    console.log(error);
                });
        }

    }

    function func4(ind) {
        axios
            .put("/api/editsavedposts", { email: email, id: posts[ind]._id })
            .then((response) => {
                console.log(response.data);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
                alert("already saved");
            });
    }

    function func5(ind) {
        console.log(text1);
        console.log(posts[ind]._id);
        let h = text1;
        for (let index = 0; index < ban.length; index++) {
            var regEx = new RegExp(ban[index], "ig");
            console.log(h);
            console.log(h.replace(regEx, "*".repeat(ban[index].length)));
            let hi = h.replace(regEx, "*".repeat(ban[index].length));
            h = hi;
        }
        axios
            .put("/api/editcomments", { id: posts[ind]._id, text: h })
            .then((response) => {
                console.log(response.data);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
        setOpen1(false);
    }

    function func6(ind) {
        const newReport = {
            subid: id.id,
            postid: posts[ind]._id,
            reportedby: email,
            reportedon: posts[ind].postedby,
            concern: concern,
            text: posts[ind].text,
        };
        if (email === posts[ind].postedby) {
            alert("cannot block yourself");
        }
        else {
            axios
                .post("/api/myreport", newReport)
                .then(function (response) {
                    console.log(response);
                    window.location.reload();
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        setOpen1(false);
    }

    function func() {
        const newPost = {
            subid: id.id,
            postedby: email,
            postedin: nam,
            text: text,
        };

        axios
            .post("/api/mypost", newPost)
            .then(function (response) {
                console.log(response);
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error);
            });
        let k = p + 1;
        axios
            .put("/api/updateposts", { id: ids, posts: k })
            .then(function (response) {
                console.log(response);
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error);
            });

        setOpen(false);
    }
    if (!(localStorage.getItem("email"))) {
        window.location = "/"
    }
    else {
        return (
            <div>
                <div>
                    <Dashboard />
                </div>
                <br />
                <Button variant="contained" style={{ backgroundColor: '#e0566d' }} onClick={handleClickOpen}>
                    Create a new post
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>POST</DialogTitle>
                    <DialogContent>

                        <TextField
                            autoFocus
                            margin="dense"
                            label="Description"
                            type="required"
                            fullWidth
                            variant="filled"
                            rows={3}
                            multiline
                            onChange={(e) => { settext(e.target.value) }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button disabled={!(text)} onClick={() => { func() }}>Save</Button>
                    </DialogActions>
                </Dialog>
                <div>
                    <img float="left" align="left" width={400} src='https://cdn.iconscout.com/icon/free/png-256/reddit-4069935-3365454.png' />
                </div>
                <br />
                <div>
                    <Card sx={{ width: 800 }} style={{ backgroundColor: '#e0566d', margin: 'auto' }}>
                        <CardHeader
                            style={{ color: 'white', textAlign: 'left' }}
                            title={nam}
                        />
                        <CardContent style={{ textAlign: 'left' }}>
                            <Typography variant="h6" sx={{ color: 'white' }}>
                                Description:
                            </Typography>
                            <Typography variant="h7" sx={{ color: 'white' }}>
                                {desc}
                            </Typography>
                            <Typography variant="h6" sx={{ color: 'white' }}>
                                No.of.users :
                            </Typography>
                            <Typography variant="h7" sx={{ color: 'white' }}>
                                {users.length}
                            </Typography>
                            <Typography variant="h6" sx={{ color: 'white' }}>
                                Banned keywords :
                            </Typography>
                            <Typography variant="h7" sx={{ color: 'white' }}>
                                {ban.toString()}
                            </Typography>
                            <Typography variant="h6" sx={{ color: 'white' }}>
                                No.of.posts :
                            </Typography>
                            <Typography variant="h7" sx={{ color: 'white' }}>
                                {posts.length}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
                <br /><br /><br /><br /><br /><br /><br /><br />
                <div>
                    <Typography variant="h4" sx={{ color: 'black' }}>
                        POSTS
                    </Typography>
                </div>
                <br />
                <div>
                    {
                        posts ? posts.map((post, ind) => (
                            <div>
                                <Card sx={{ width: 800 }} style={{ backgroundColor: '#e0566d', margin: 'auto' }}>
                                    <CardContent style={{ textAlign: 'left' }}>
                                        <Typography variant="h7" sx={{ color: 'white' }}>
                                            {post.text}
                                        </Typography>
                                        <br />
                                        {/* {busers.length !== 0 && busers.includes(post.postedby) && email !== nam1 &&
                                            <Typography variant="h7" sx={{ color: 'white' }}>
                                                posted by : Blocked User
                                            </Typography>
                                        }
                                        {(!busers.length || !busers.includes(post.postedby) || email === nam1) &&
    
                                        } */}
                                        <Typography variant="h7" sx={{ color: 'white' }}>
                                            posted by : {post.postedby}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <div>
                                            <IconButton onClick={() => { func1(ind) }} style={{ color: 'white' }}><ThumbUpIcon /></IconButton>
                                            {!(post.upvotes.length) ? 0 : post.upvotes.length}
                                            <IconButton onClick={() => { func2(ind) }} style={{ color: 'white' }}><ThumbDownIcon /></IconButton>
                                            {!(post.downvotes.length) ? 0 : post.downvotes.length}
                                            <IconButton onClick={() => { func3(ind) }} style={{ color: 'white' }}><PersonAddAlt1Icon /></IconButton>
                                            <IconButton onClick={() => { func4(ind) }} style={{ color: 'white' }}><BookmarkAddIcon /></IconButton>
                                            <IconButton onClick={handleClickOpen1} style={{ color: 'white' }}><ReportIcon /></IconButton>
                                            {/* <Dialog open={open1} onClose={handleClose1}>
                                                <DialogTitle>REPORT</DialogTitle>
                                                <DialogContent>
    
                                                </DialogContent>
                                                <DialogActions>
    
                                                </DialogActions>
                                            </Dialog> */}
                                            <br />
                                            <TextField
                                                style={{ width: 800 }}
                                                autoFocus
                                                margin="dense"
                                                label="Comment here"
                                                type="required"
                                                fullWidth
                                                variant="filled"
                                                onChange={(e) => { settext1(e.target.value) }}
                                            />
                                            <br />
                                            <Button variant="contained" disabled={!text1} onClick={() => { func5(ind) }} style={{ backgroundColor: 'white', color: '#e0566d' }}>
                                                Comment
                                            </Button>
                                        </div>
                                    </CardActions>
                                    {open1 &&
                                        <div>
                                            <CardContent>
                                                <TextField
                                                    autoFocus
                                                    margin="dense"
                                                    label="Concern"
                                                    type="required"
                                                    fullWidth
                                                    variant="filled"
                                                    multiline
                                                    onChange={(e) => { setconcern(e.target.value) }}
                                                />
                                                <Button onClick={handleClose1}>Cancel</Button>
                                                <Button disabled={!(concern)} onClick={() => { func6(ind) }}>Save</Button>
                                            </CardContent>
                                        </div>
                                    }
                                    <CardContent style={{ textAlign: 'left' }}>
                                        <div>
                                            <Typography variant="h7" sx={{ color: 'black' }}>
                                                COMMENTS({posts[ind].comments.length}):
                                            </Typography>
                                        </div>
                                        {
                                            posts[ind].comments ? posts[ind].comments.map((c, i) => (
                                                <div>
                                                    <Typography variant="h7" sx={{ color: 'white' }}>
                                                        {c}
                                                    </Typography>
                                                    <br />
                                                </div>
                                            )) : null
                                        }
                                    </CardContent>
                                </Card>
                                <br /><br />
                            </div>
                        )
                        ) : null
                    }
                </div>
                <div>
                </div>
            </div>
        )
    }

}
