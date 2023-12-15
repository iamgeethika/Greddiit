import React from 'react'
import Dashboard from './Dashboard';
import { useState } from 'react';
import axios from 'axios';
import { Card, CardActions, CardContent, CardHeader, DialogContent, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect } from "react";
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import { useNavigate } from 'react-router-dom';

export default function Savedposts() {
    const navigate = useNavigate();
    const email = localStorage.getItem("email");
    const [postid, setpostid] = useState([]);
    const [posts, setposts] = useState([]);
    useEffect(() => {
        axios
            .post("/api/getmysavedposts", { email: email })
            .then((res) => {
                setpostid(res.data.savedposts);
                console.log(res.data.savedposts);
                axios
                    .post("/api/getmysavedposts1", { ids: res.data.savedposts })
                    .then((r) => {
                        setposts(r.data);
                        console.log(r.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function func(ind) {
        axios.post("/api/deletesavedposts", {
            email: email,
            id: posts[ind]._id,
        }).then((res) => {
            console.log(res.data);
            window.location.reload();
        })
            .catch((err) => {
                console.log(err);
            });
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
                <Typography variant="h5" sx={{ color: 'black' }}>SAVED POSTS</Typography>
                <div>
                    {
                        posts ? posts.map((post, ind) => (
                            <div>

                                <Card sx={{ width: 600 }} style={{ backgroundColor: '#e0566d', margin: 'auto' }}>
                                    <CardContent style={{ textAlign: 'left' }}>
                                        <div>
                                            <Typography variant="h7" sx={{ color: 'white' }}>
                                                {post.text}
                                            </Typography>
                                            <br />
                                            <Typography variant="h7" sx={{ color: 'white' }}>
                                                posted by : {post.postedby}
                                            </Typography>
                                            <br />
                                            <Typography variant="h7" sx={{ color: 'white' }}>
                                                posted in : {post.postedin}
                                            </Typography>
                                            <br /><br />
                                            <Typography variant="h7" sx={{ color: 'black' }}>
                                                COMMENTS({posts[ind].comments.length}):
                                            </Typography>
                                            <br />
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
                                        </div>
                                    </CardContent>
                                    <CardActions>
                                        <IconButton onClick={() => { func(ind) }} style={{ color: 'white' }}><BookmarkRemoveIcon /></IconButton>
                                    </CardActions>
                                </Card>
                                <br /><br />
                            </div>
                        )) : null
                    }
                </div>
            </div>
        )
    }


}
