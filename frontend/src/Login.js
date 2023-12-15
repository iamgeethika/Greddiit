import React, { Component } from 'react'
import { Box } from '@mui/material';
import { shadows } from '@mui/system';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import Alert from '@mui/material/Alert';



const Login = () => {
    const navigate = useNavigate();
    const [email, Setemail] = useState("");
    const [pwd, Setpwd] = useState("");
    const [method, SetMethod] = useState("login");
    const [email1, Setemail1] = useState("");
    const [pwd1, Setpwd1] = useState("");
    const [uname, Setuname] = useState("");
    const [cno, Setcno] = useState("");
    const [age, Setage] = useState("");
    const [fname, Setfn] = useState("");
    const [lname, Setln] = useState("");


    useEffect(function () {
        const ml = localStorage.getItem("email");
        // const pl = localStorage.getItem("password");
        // if (ml === "admin" && pl === "admin")
        //     setset(true);
        if (ml) {
            navigate("/profile")
        }
    })


    function func() {
        // e.preventDefault();
        if (email !== "" && pwd !== "") {
            const user = {
                email: email,
                pwd: pwd,
            };
            axios
                .post("/api/login", user)
                .then(function (response) {
                    console.log(response);
                    localStorage.setItem('email', user.email);
                    navigate("/profile");
                    console.log(response.data.email1);
                })
                .catch(function (error) {
                    console.log(error);
                });
            Setemail("");
            Setpwd("");
        }
    }

    function func1() {
        if (email1 !== "" && pwd1 !== "" && uname !== "" && cno !== "" && age !== "" && fname !== "" && lname !== "") {

            const newUser = {
                fname: fname,
                lname: lname,
                uname: uname,
                email1: email1,
                age: age,
                cno: cno,
                pwd1: pwd1,
            };
            console.log(newUser);
            axios
                .post("/api/register", newUser)
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
            Setemail1("");
            Setpwd1("");
            Setfn("");
            Setln("");
            Setuname("");
            Setcno("");
            Setage("");
            SetMethod("login");
            navigate("/");
            Setemail(null);
            Setpwd(null);
        }
    }
    if (!(localStorage.getItem("email")))
        return (

            <div>
                <div style={{ textAlign: "left" }}>
                    <img src="https://icons-for-free.com/iconfiles/png/512/bubble+gradient+liquid+pink+reddit+watercolour+yellow-1320086423899180644.png" alt="Geethika" width="120" height="120" style={{ borderRadius: "50%" }} />
                </div>
                <link href="https://fonts.googleapis.com/css?family=Sofia"></link>
                <link href="https://fonts.googleapis.com/css2?family=Satisfy&display=swap" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/css2?family=Cookie&family=Satisfy&display=swap" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Cookie&family=Satisfy&display=swap" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Cookie&family=Satisfy&family=Viga&display=swap" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Cookie&family=Satisfy&family=Titan+One&family=Viga&display=swap" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Cookie&family=Lalezar&family=Satisfy&family=Titan+One&family=Viga&display=swap" rel="stylesheet"></link>

                {/* <div style={{ marginRight: "0px", marginLeft: "100px", marginTop: "-50px" }}>
                <h1 className="glow" style={{ color: "pink", fontFamily: "Sofia" }}>SHINE</h1>
            </div> */}
                <div style={{ textAlign: "right" }}>
                <a href="https://youtube.com/watch?v=7Aa4zRgY9vE&feature=shares"><img src="shine.png" alt="Geethika" width="200" height="200" style={{ marginTop: "-100px" }} /></a>
                </div>
                <br /><br />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#e0566d', fontFamily: 'Satisfy', fontSize: '50px', marginTop: '-150px', marginRight: '1700px' }}>
                    GREDDIIT
                </Typography>


                <div style={{
                    position: 'absolute', left: '20%', top: '50%',
                    transform: 'translate(-50%, -50%)',
                }}>
                    <Button className="grow" id='button1' onClick={() => { SetMethod("login") }} type="submit" variant="contained" style={{ backgroundColor: '#e0566d', fontSize: '20px', width: 175 ,marginRight:'10px'}}>Sign in</Button>
                    <Button className="grow" id='button2' onClick={() => { SetMethod("register") }} type="submit" variant="contained" style={{ backgroundColor: '#e0566d', fontSize: '20px', width: 175 }}>Sign up</Button>
                    {method === "login" &&
                        <Box sx={{
                            display: 'flex',
                            boxShadow: 3,
                            alignContent: 'center',
                            width: 360,
                            height: 360,
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: 'auto',
                            backgroundColor: 'white',
                            position: 'relative',

                        }}>
                            <div>
                                <img src="https://icons-for-free.com/iconfiles/png/512/bubble+gradient+liquid+pink+reddit+watercolour+yellow-1320086423899180644.png" alt="Geethika" width="50" height="50" />
                                <br></br><br></br>
                                <form>
                                    <EmailIcon fontSize='medium' style={{ color: '#e0566d', marginRight: '15', marginTop: '10' }}></EmailIcon>
                                    <TextField
                                        required
                                        id="ename"
                                        label="Email"
                                        type="email"
                                        onChange={(e) => { Setemail(e.target.value) }}
                                    />
                                    <br /><br /><br />
                                    <VpnKeyIcon fontSize='medium' style={{ color: '#e0566d', marginRight: '15', marginTop: '10' }}></VpnKeyIcon>
                                    <TextField
                                        required
                                        id="pwd"
                                        label="Password"
                                        type="password"
                                        // onKeyUp={success()}
                                        onChange={(p) => { Setpwd(p.target.value) }}
                                    />
                                    <br /><br />
                                    <Button id='button' disabled={!(email && pwd)} onClick={() => { func() }} className="grow" type="submit" variant="contained" style={{ backgroundColor: '#e0566d', color: 'azure', fontFamily: 'Sofia', height: '40px' }}>Login</Button>
                                </form>
                                <br></br>
                                <Typography sx={{ fontFamily: 'Lalezar' }}>Don't have an Account? <Link onClick={() => { SetMethod("register", 1) }} type="submit" variant="contained" style={{ color: '#e0566d', fontSize: '15px' }}>Sign Up!</Link></Typography>

                            </div>
                        </Box>
                    }
                    {method === "register" &&
                        <Box sx={{
                            display: 'flex',
                            boxShadow: 3,
                            alignContent: 'center',
                            width: 350,
                            height: 770,
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: 'auto',
                            backgroundColor: 'white',

                        }}>
                            <div>
                                <form>
                                    <TextField
                                        required
                                        id="fname"
                                        label="First Name"
                                        type="First Name"
                                        onChange={(e) => { Setfn(e.target.value) }}
                                    />
                                    <br /><br />
                                    <TextField
                                        required
                                        id="lname"
                                        label="Last Name"
                                        type="Last Name"
                                        onChange={(e) => { Setln(e.target.value) }}
                                    />
                                    <br /><br />
                                    <TextField
                                        required
                                        id="usname"
                                        label="User Name"
                                        type="User Name"
                                        onChange={(e) => { Setuname(e.target.value) }}
                                    />
                                    <br /><br />
                                    <TextField
                                        required
                                        id="em"
                                        label="Email"
                                        type="email"
                                        onChange={(e) => { Setemail1(e.target.value) }}
                                    />
                                    <br /><br />
                                    <TextField
                                        required
                                        id="age"
                                        label="Age"
                                        onChange={(e) => { Setage(e.target.value) }}
                                    />
                                    <br /><br />
                                    <TextField
                                        required
                                        id="cno"
                                        label="Contact Number"
                                        onChange={(e) => { Setcno(e.target.value) }}
                                    />
                                    <br /><br />
                                    <TextField
                                        required
                                        id="p"
                                        label="Password"
                                        type="password"
                                        onChange={(p) => { Setpwd1(p.target.value) }}
                                    />
                                    <br /><br />
                                    <Button id='button' disabled={!(email1 && pwd1 && uname && fname && lname && cno && age)} className="grow" type="submit" onClick={() => { func1() }} variant="contained" style={{ backgroundColor: '#e0566d',color:'azure',fontFamily:'Sofia', height: '40px' }}>Register</Button>
                                </form>
                                <br></br>
                                <Typography sx={{ fontFamily: 'Lalezar' }}>Already have an Account? <Link onClick={() => { SetMethod("login", 1) }} type="submit" variant="contained" style={{ color: '#e0566d', fontSize: '15px' }}>Sign In!</Link></Typography>

                            </div>
                        </Box>
                    }
                </div>
            </div>
        )
    else {
        window.location = "/profile"
    }
}

export default Login;

