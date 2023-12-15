import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams, useNavigate } from 'react-router-dom';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Dashboard from './Dashboard';


export default function Mysubgreddit() {
    const navigate = useNavigate();
    const [greddits, setgreddits] = useState([]);
    const [open, setOpen] = useState(false);
    const [name, setname] = useState("");
    const [desc, setDesc] = useState("");
    const [email, setEmail] = useState("");
    // const [index, setIndex] = useState(0);
    const [bankeywor, setbankeywor] = useState([]);
    const [tags, setTags] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    function Del(ind) {
        axios.post("/api/subgredditdelete", {
            name: greddits[ind].name,
            email: email,
        }).then((res) => {
            console.log(res.data);
            axios.post("/api/postdelete", {
                id: greddits[ind]._id,
            }).then((res) => {
                console.log(res.data);
            })
                .catch((err) => {
                    console.log(err);
                });
            window.location.reload();
        })
            .catch((err) => {
                console.log(err);
            });

    }
    function Open(ind) {
        let h = greddits[ind].name;
        let path = "/" + h + "/subgreddit";
        console.log(path);
        navigate(path);
    }
    function func() {
        console.log(name)
        console.log(desc)
        const u = [email];
        console.log(u);
        console.log(tags);

        const newPost = {
            email: email,
            name: name,
            desc: desc,
            tags: tags,
            bankeywor: bankeywor,
            users: u,
        };
        axios
            .post("/api/mysubgreddit", newPost)
            .then(function (response) {
                console.log(response);
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error);
                alert("Subgreddit name already exists");
            });

        // axios
        //     .put("/api/editusers", { email: email, name: name, e: email })
        //     .then((response) => {
        //         console.log(response.data);
        //         window.location.reload();
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });

        setOpen(false)
    }
    useEffect(() => {
        const email1 = localStorage.getItem("email");
        let p = [];
        console.log(email1);
        setEmail(email1);
        axios
            .post("/api/getmygreddit", { email: email1 })
            .then((res) => {
                setgreddits(res.data);
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    if (!(localStorage.getItem("email"))) {
        window.location = "/"
    }
    else {
        return (
            <div>
                <div><Dashboard /></div>
                <br /><br />
                <Button variant="contained" style={{ backgroundColor: '#e0566d' }} onClick={handleClickOpen}>
                    Create a new subgreddit
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Subgreddit</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Name"
                            type="required"
                            fullWidth
                            variant="filled"
                            onChange={(e) => { setname(e.target.value) }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Description"
                            type="required"
                            fullWidth
                            variant="filled"
                            rows={3}
                            multiline
                            onChange={(e) => { setDesc(e.target.value) }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="tags"
                            type="required"
                            fullWidth
                            variant="filled"
                            multiline
                            onChange={(e) => { setTags(e.target.value.split(",")) }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Banned key words"
                            type="required"
                            fullWidth
                            variant="filled"
                            multiline
                            onChange={(e) => { setbankeywor(e.target.value.split(",")) }}
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button disabled={!(name && desc)} onClick={() => { func() }}>Save</Button>
                    </DialogActions>
                </Dialog>
                <br /><br />

                {
                    greddits ? greddits.map((greddit, ind) => (
                        <div>
                            <Card sx={{ width: 600 }} style={{ backgroundColor: '#e0566d', margin: 'auto' }}>
                                <CardHeader
                                    style={{ color: 'white', textAlign: 'left' }}
                                    title={greddit.name}
                                    action={
                                        <>
                                            <IconButton>
                                                <DeleteIcon style={{ color: 'white' }} onClick={() => {
                                                    Del(ind)
                                                }} />
                                            </IconButton>
                                            <IconButton>
                                                <OpenInNewIcon style={{ color: 'white' }} onClick={() => {
                                                    Open(ind)
                                                }} />
                                            </IconButton>
                                        </>
                                    }
                                />

                                <CardContent style={{ textAlign: 'left' }}>
                                    <Typography variant="h6" sx={{ color: 'white' }}>
                                        Description:
                                    </Typography>
                                    <Typography variant="h7" sx={{ color: 'white' }}>
                                        {greddit.desc}
                                    </Typography>
                                    <Typography variant="h6" sx={{ color: 'white' }}>
                                        Banned Key Words:
                                    </Typography>
                                    <Typography variant="h7" sx={{ color: 'white' }}>
                                        {greddit.bankeywor.toString()}
                                    </Typography>
                                    <Typography variant="h6" sx={{ color: 'white' }}>
                                        No.of.users :
                                    </Typography>
                                    <Typography variant="h7" sx={{ color: 'white' }}>
                                        {greddit.users.length + greddit.blockedusers.length}
                                    </Typography>
                                    <Typography variant="h6" sx={{ color: 'white' }}>
                                        No.of.posts :
                                    </Typography>
                                    <Typography variant="h7" sx={{ color: 'white' }}>
                                        {greddit.posts}
                                    </Typography>
                                </CardContent>
                            </Card>
                            <br /><br />
                        </div>
                    )) : null
                }
            </div>
        )
    }

}
