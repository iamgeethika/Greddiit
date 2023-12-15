import './App.css';
import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useState, useEffect } from "react";
import axios from 'axios';
import Dashboard from './Dashboard';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import RemoveIcon from '@mui/icons-material/Remove';

export default function Profile() {
  const navigate = useNavigate();
  const [email1, Setemail1] = useState("");
  const [uname, Setuname] = useState("");
  const [cno, Setcno] = useState("");
  const [age, Setage] = useState("");
  const [fname, Setfn] = useState("");
  const [lname, Setln] = useState("");
  const [followers, Setfollowers] = useState([]);
  const [following, Setfollowing] = useState([]);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

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

  function func() {
    localStorage.removeItem("email");
    localStorage.removeItem("pwd");
    navigate("/");
  }

  function getuname(e) {
    axios.get('/api/profile', { params: { email: e } })
      .then(res => {
        console.log(res.data.uname);
        return res.data.uname;
      })
      .catch(error => {
        console.log(error)
      });
  }
  function func1() {
    if (email1 !== "" && uname !== "" && cno !== "" && age !== "" && fname !== "" && lname !== "") {

      const newUser = {
        fname: fname,
        lname: lname,
        uname: uname,
        email1: email1,
        age: age,
        cno: cno,
      };
      console.log(newUser);
      axios
        .put("/api/editprofile", newUser)
        .then((response) => {
          alert("User updated successfully");
          // localStorage.removeItem("email");
          // localStorage.setItem('email', newUser.email1);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  useEffect(() => {
    const email = localStorage.getItem("email")
    axios.get('/api/profile', { params: { email: email } })
      .then(res => {
        Setemail1(res.data.email)
        Setage(res.data.age)
        Setcno(res.data.cno)
        Setfn(res.data.fname)
        Setln(res.data.lname)
        Setuname(res.data.uname)
        Setfollowers(res.data.followers)
        Setfollowing(res.data.following)
        console.log(res.data.followers)
      })
      .catch(error => {
        console.log(error)
      });

  }, []);
  function func3(ind) {
    const f = followers[ind];
    followers.splice(ind, 1);
    Setfollowers(followers);
    const newUser = {
      followers: followers,
      email: email1,
    }
    axios
      .put("/api/editfollowers", newUser)
      .then((response) => {
        // alert("User updated successfully");
        console.log(response.data);
        // window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
    axios.get('/api/profile', { params: { email: f } })
      .then(res => {
        console.log(res.data.following);
        const array = res.data.following;
        for (let index = 0; index < array.length; index++) {
          if (array[index] === email1) {
            array.splice(index, 1);
            break;
          }
        }
        const newUser1 = {
          following: array,
          email: f,
        }
        axios
          .put("/api/editfollowing", newUser1)
          .then((response) => {
            alert("User updated successfully");
            console.log(response.data);
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error)
      });
  }
  function func4(ind) {
    const f = following[ind];
    following.splice(ind, 1);
    Setfollowing(following);
    const newUser = {
      following: following,
      email: email1,
    }
    axios
      .put("/api/editfollowing", newUser)
      .then((response) => {
        // alert("User updated successfully");
        console.log(response.data);
        // window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
    axios.get('/api/profile', { params: { email: f } })
      .then(res => {
        console.log(res.data.followers);
        const array = res.data.followers;
        for (let index = 0; index < array.length; index++) {
          if (array[index] === email1) {
            array.splice(index, 1);
            break;
          }
        }
        const newUser1 = {
          followers: array,
          email: f,
        }
        axios
          .put("/api/editfollowers", newUser1)
          .then((response) => {
            alert("User updated successfully");
            console.log(response.data);
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error)
      });
  }
  if (!(localStorage.getItem("email"))) {
    window.location = "/"
  }
  else {
    return (
      <div>
        <link href="https://fonts.googleapis.com/css2?family=Satisfy&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Cookie&family=Satisfy&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Cookie&family=Satisfy&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Cookie&family=Satisfy&family=Viga&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Cookie&family=Satisfy&family=Titan+One&family=Viga&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Cookie&family=Lalezar&family=Satisfy&family=Titan+One&family=Viga&display=swap" rel="stylesheet"></link>


        <div><Dashboard /></div>
        <div style={{ textAlign: "left" }}>
          <img src="https://icons-for-free.com/iconfiles/png/512/bubble+gradient+liquid+pink+reddit+watercolour+yellow-1320086423899180644.png" alt="Geethika" width="120" height="120" style={{ borderRadius: "50%" }} />
        </div>
        <div style={{ textAlign: "right" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#e0566d', fontFamily: 'Satisfy', fontSize: '50px', marginTop: '-80px'}}>
            GREDDIIT
          </Typography>
        </div>
        <div style={{
          position: 'absolute', left: '20%', top: '50%',
          transform: 'translate(-50%, -50%)',
        }}>
          <Box sx={{
            display: 'flex',
            boxShadow: 3,
            alignContent: 'center',
            width: 500,
            height: 700,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 'auto',
            backgroundColor: 'white',
            position: 'relative',

          }}>
            <div>
              <Typography sx={{ fontFamily: 'Lalezar', marginleft: "14", fontSize: '30px' }}>PROFILE</Typography>
              {/* <Avatar */}
              {/* //   sx={{ backgroundColor: '#e0566d', height: 90, width: 90, marginLeft: 14 }}
              //   alt="Remy Sharp"
              //   src="/broken-image.jpg"
              // >
              //   <AccountCircleIcon style={{ fontSize: '80px' }} /> */}
              <img src="https://img.freepik.com/premium-vector/avatar-portrait-kid-caucasian-boy-round-frame-vector-illustration-cartoon-flat-style_551425-43.jpg" alt="Geethika" height="100" width="100" marginleft="14" /><br />
              {/* </Avatar> */}
              <br />
              <div>
                <form>
                  <TextField
                    required
                    id="fname"
                    label="First Name"
                    value={fname}
                    type="First Name"
                    onChange={(e) => { Setfn(e.target.value) }}
                  />
                  <br /><br />
                  <TextField
                    required
                    id="lname"
                    label="Last Name"
                    value={lname}
                    type="Last Name"
                    onChange={(e) => { Setln(e.target.value) }}
                  />
                  <br /> <br />
                  <TextField
                    required
                    id="usname"
                    label="User Name"
                    value={uname}
                    type="User Name"
                    onChange={(e) => { Setuname(e.target.value) }}
                  />
                  <br /><br />
                  {/* <TextField
                    required
                    id="em"
                    label="Email"
                    value={email1}
                    type="email"
                    onChange={(e) => { Setemail1(e.target.value) }}
                  />
                  <br /><br /> */}
                  <TextField
                    required
                    id="age"
                    value={age}
                    label="Age"
                    type={Number}
                    onChange={(e) => { Setage(e.target.value) }}
                  />
                  <br /><br />
                  <TextField
                    required
                    id="cno"
                    value={cno}
                    label="Contact Number"
                    onChange={(e) => { Setcno(e.target.value) }}
                  />
                  <br /><br />
                  <Button id='button' type="submit" onClick={() => { func1() }} variant="contained" style={{ backgroundColor: '#e0566d' }}>Save</Button>
                </form>
              </div>
              <br />
              <Chip label="FOLLOWERS :" style={{ backgroundColor: '#e0566d', marginRight: 5 }} />
              <Chip label={followers.length} clickable style={{ backgroundColor: '#e0566d', marginRight: 5 }} onClick={handleClickOpen} />
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ fontFamily: "Bangers" }}>FOLLOWERS</DialogTitle>
                <DialogContent>
                  <div>
                    {followers ? followers.map((follower, ind) => (
                      < div >
                        <Typography variant="h8" component="div" sx={{ color: 'black' }}>
                          {follower}
                          <IconButton onClick={() => { func3(ind) }} style={{ right: "10px", position: "absolute" }}><RemoveIcon /></IconButton>
                        </Typography>
                      </div>
                    )) : null

                    }
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Close</Button>
                </DialogActions>
              </Dialog>
              <Chip label="FOLLOWING :" style={{ backgroundColor: '#e0566d', marginRight: 5 }} />
              <Chip label={following.length} clickable style={{ backgroundColor: '#e0566d', marginRight: 5 }} onClick={handleClickOpen1} />
              <Dialog open={open1} onClose={handleClose1}>
                <DialogTitle sx={{ fontFamily: "Bangers" }}>FOLLOWING</DialogTitle>
                <DialogContent>
                  <div>
                    {following ? following.map((followin, ind) => (
                      < div >
                        <Typography variant="h8" component="div" sx={{ color: 'black' }}>
                          {followin}
                          <Button onClick={() => { func4(ind) }} style={{ position: "absolute", right: "10px", borderradius: 8, width: "6rem", marginleft: "40%", outline: "none", }}>UNFOLLOW</Button>
                        </Typography>
                      </div>
                    )) : null
                    }
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose1}>Close</Button>
                </DialogActions>
              </Dialog>
            </div>
          </Box>
        </div >
      </div >
    )
  }
}

