import React from 'react'
import Dashboard from './Dashboard';
import { useState } from 'react';
import { useEffect } from "react";
import Button from '@mui/material/Button';
import axios from 'axios';
import { Card, CardContent, CardHeader } from '@mui/material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

export default function Allsubgreddits() {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const [greddits, setgreddits] = useState([]);
  const [search, setsearch] = useState("");
  const [arr, setarr] = useState([]);
  const [sort, setsort] = useState(false);
  const [sortdes, setsortdes] = useState(false);
  const [sortfol, setsortfol] = useState(false);
  const [sortcr, setsortcr] = useState(false);

  function removeDuplicates(arr) {
    return [...new Set(arr)];
  }

  useEffect(() => {
    let p = [];
    axios
      .post("/api/getallgreddits")
      .then((res) => {
        setgreddits(res.data);
        let tagarray = [];
        console.log(res.data);
        for (let index = 0; index < res.data.length; index++) {
          console.log("hello");
          console.log(res.data[index].tags);
          let h = res.data[index].tags;
          console.log(h);
          for (let ind = 0; ind < h.length; ind++) {
            tagarray.push(h[ind]);
          }
        }
        tagarray = removeDuplicates(tagarray);
        console.log(tagarray);
        setarr(tagarray);
        console.log(arr);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function func() {
    greddits.sort(function (a, b) {
      if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
      if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
      return 0;
    })
    setgreddits(greddits);
    console.log(greddits);
    setsort(true);
    setsortdes(false);
    setsortfol(false);
    setsortcr(false);
  }

  function func1() {
    greddits.sort(function (a, b) {
      if (a.name.toLowerCase() < b.name.toLowerCase()) { return 1; }
      if (a.name.toLowerCase() > b.name.toLowerCase()) { return -1; }
      return 0;
    })
    setgreddits(greddits);
    console.log(greddits);
    setsortdes(true);
    setsort(false);
    setsortfol(false);
    setsortcr(false);
  }

  function func3() {
    greddits.sort(function (a, b) {
      if (a.users.length < b.users.length) { return 1; }
      if (a.users.length > b.users.length) { return -1; }
      return 0;
    })
    setgreddits(greddits);
    console.log(greddits);
    setsortdes(false);
    setsort(false);
    setsortfol(true);
    setsortcr(false);
  }

  function func4() {
    greddits.sort(function (a, b) {
      return new Date(b.created).getTime() - new Date(a.created).getTime();
    })
    setgreddits(greddits);
    console.log(greddits);
    setsortdes(false);
    setsort(false);
    setsortfol(false);
    setsortcr(true);
  }

  function func5(ind) {
    let p = greddits[ind]._id;
    let path = "/" + p + "/greddit";
    console.log(path);
    navigate(path);
  }

  function func6(ind) {
    axios
      .put("/api/editjoiningrequests1", { email: email, id: greddits[ind]._id })
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        alert("cannot send request");
      });
  }

  function func7(ind) {
    axios
      .put("/api/editusers2", { e: email, id: greddits[ind]._id })
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .put("/api/editleftusers", { e: email, id: greddits[ind]._id })
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  if (!(localStorage.getItem("email"))) {
    window.location = "/"
  }
  else {
    return (

      <div>
        <div><Dashboard /></div>
        <br />
        <div>
          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', margin: 'auto', width: 800, backgroundColor: '#ffffff7c' }}
          >
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5, borderColor: 'black' }} orientation="vertical" />
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search greddits"
              onChange={(e) => { setsearch(e.target.value) }}
            />
          </Paper>
        </div>
        <br />
        <div>
          <Button variant="contained" style={{ backgroundColor: '#e0566d', marginRight: "10px" }} onClick={() => { func() }} type='submit'>Sort by Name ascending</Button>
          <Button variant="contained" style={{ backgroundColor: '#e0566d' }} onClick={() => { func1() }} type='submit'>Sort by Name descending</Button>
        </div>
        <br />
        <div>
          <Button variant="contained" style={{ backgroundColor: '#e0566d', marginRight: "10px" }} onClick={() => { func3() }} type='submit'>Sort by Followers</Button>
          <Button variant="contained" style={{ backgroundColor: '#e0566d' }} onClick={() => { func4() }} type='submit'>Sort by Creation Date</Button>
        </div>
        <br />
        {
          <div>
            <div >
              {greddits ? greddits.map((greddit, ind) => {
                if (!search || greddit.name.toLowerCase().includes(search.toLowerCase())) {
                  return (<div>
                    {greddit.email === email &&
                      <div>
                        <Card sx={{ width: 600 }} style={{ backgroundColor: '#e0566d', margin: 'auto' }}>
                          <CardHeader
                            style={{ color: 'white', textAlign: 'left' }}
                            title={greddit.name}
                            action={
                              <>
                                {
                                  greddit.users.includes(email) && greddit.email === email &&
                                  <div>
                                    <Button variant="contained" onClick={() => { func5(ind) }} style={{ backgroundColor: 'white', color: '#e0566d', marginRight: "10px" }}>
                                      Open
                                    </Button>
                                    <Button disabled={true} variant="contained" style={{ backgroundColor: 'white' }}>
                                      Leave
                                    </Button>
                                  </div>
                                }
                                {
                                  greddit.users.includes(email) && greddit.email !== email &&
                                  <div>
                                    <Button variant="contained" onClick={() => { func5(ind) }} style={{ backgroundColor: 'white', color: '#e0566d', marginRight: "10px" }}>
                                      Open
                                    </Button>
                                    <Button variant="contained" onClick={() => { func7(ind) }} style={{ backgroundColor: 'white', color: '#e0566d' }}>
                                      Leave
                                    </Button>
                                  </div>
                                }
                                {
                                  !greddit.users.includes(email) && greddit.blockedusers.includes(email) &&
                                  <div>
                                    <Button variant="contained" disabled={true} onClick={() => { func6(ind) }} style={{ backgroundColor: 'white', marginRight: "10px" }}>
                                      join
                                    </Button>
                                  </div>
                                }
                                {
                                  !greddit.users.includes(email) && !greddit.blockedusers.includes(email) &&
                                  <div>
                                    <Button variant="contained" onClick={() => { func6(ind) }} style={{ backgroundColor: 'white', color: '#e0566d', marginRight: "10px" }}>
                                      join
                                    </Button>
                                  </div>
                                }
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
                              {greddit.users.length}
                            </Typography>
                            <Typography variant="h6" sx={{ color: 'white' }}>
                              No.of.posts :
                            </Typography>
                            <Typography variant="h7" sx={{ color: 'white' }}>
                              {greddit.posts}
                            </Typography>
                          </CardContent>
                        </Card>
                        <br />
                      </div>
                    }

                  </div>);
                }
              }) : null}
            </div>
            <div >
              {greddits ? greddits.map((greddit, ind) => {
                if (!search || greddit.name.toLowerCase().includes(search.toLowerCase())) {
                  return (<div>
                    {greddit.email !== email && greddit.users.includes(email) &&
                      <div>
                        <Card sx={{ width: 600 }} style={{ backgroundColor: '#e0566d', margin: 'auto' }}>
                          <CardHeader
                            style={{ color: 'white', textAlign: 'left' }}
                            title={greddit.name}
                            action={
                              <>
                                {
                                  greddit.users.includes(email) && greddit.email === email &&
                                  <div>
                                    <Button variant="contained" onClick={() => { func5(ind) }} style={{ backgroundColor: 'white', color: '#e0566d', marginRight: "10px" }}>
                                      Open
                                    </Button>
                                    <Button disabled={true} variant="contained" style={{ backgroundColor: 'white' }}>
                                      Leave
                                    </Button>
                                  </div>
                                }
                                {
                                  greddit.users.includes(email) && greddit.email !== email &&
                                  <div>
                                    <Button variant="contained" onClick={() => { func5(ind) }} style={{ backgroundColor: 'white', color: '#e0566d', marginRight: "10px" }}>
                                      Open
                                    </Button>
                                    <Button variant="contained" onClick={() => { func7(ind) }} style={{ backgroundColor: 'white', color: '#e0566d' }}>
                                      Leave
                                    </Button>
                                  </div>
                                }
                                {
                                  !greddit.users.includes(email) && greddit.blockedusers.includes(email) &&
                                  <div>
                                    <Button variant="contained" disabled={true} onClick={() => { func6(ind) }} style={{ backgroundColor: 'white', marginRight: "10px" }}>
                                      join
                                    </Button>
                                  </div>
                                }
                                {
                                  !greddit.users.includes(email) && !greddit.blockedusers.includes(email) &&
                                  <div>
                                    <Button variant="contained" onClick={() => { func6(ind) }} style={{ backgroundColor: 'white', color: '#e0566d', marginRight: "10px" }}>
                                      join
                                    </Button>
                                  </div>
                                }
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
                              {greddit.users.length}
                            </Typography>
                            <Typography variant="h6" sx={{ color: 'white' }}>
                              No.of.posts :
                            </Typography>
                            <Typography variant="h7" sx={{ color: 'white' }}>
                              {greddit.posts}
                            </Typography>
                          </CardContent>
                        </Card>
                        <br />
                      </div>
                    }

                  </div>);
                }
              }) : null}
            </div>
            <div >
              {greddits ? greddits.map((greddit, ind) => {
                if (!search || greddit.name.toLowerCase().includes(search.toLowerCase())) {
                  return (<div>
                    {(greddit.email !== email && !greddit.users.includes(email) && !greddit.blockedusers.includes(email)) &&
                      <div>
                        <Card sx={{ width: 600 }} style={{ backgroundColor: '#e0566d', margin: 'auto' }}>
                          <CardHeader
                            style={{ color: 'white', textAlign: 'left' }}
                            title={greddit.name}
                            action={
                              <>
                                {
                                  greddit.users.includes(email) && greddit.email === email &&
                                  <div>
                                    <Button variant="contained" onClick={() => { func5(ind) }} style={{ backgroundColor: 'white', color: '#e0566d', marginRight: "10px" }}>
                                      Open
                                    </Button>
                                    <Button disabled={true} variant="contained" style={{ backgroundColor: 'white' }}>
                                      Leave
                                    </Button>
                                  </div>
                                }
                                {
                                  greddit.users.includes(email) && greddit.email !== email &&
                                  <div>
                                    <Button variant="contained" onClick={() => { func5(ind) }} style={{ backgroundColor: 'white', color: '#e0566d', marginRight: "10px" }}>
                                      Open
                                    </Button>
                                    <Button variant="contained" onClick={() => { func7(ind) }} style={{ backgroundColor: 'white', color: '#e0566d' }}>
                                      Leave
                                    </Button>
                                  </div>
                                }
                                {
                                  !greddit.users.includes(email) && greddit.blockedusers.includes(email) &&
                                  <div>
                                    <Button variant="contained" disabled={true} onClick={() => { func6(ind) }} style={{ backgroundColor: 'white', marginRight: "10px" }}>
                                      join
                                    </Button>
                                  </div>
                                }
                                {
                                  !greddit.users.includes(email) && !greddit.blockedusers.includes(email) &&
                                  <div>
                                    <Button variant="contained" onClick={() => { func6(ind) }} style={{ backgroundColor: 'white', color: '#e0566d', marginRight: "10px" }}>
                                      join
                                    </Button>
                                  </div>
                                }
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
                              {greddit.users.length}
                            </Typography>
                            <Typography variant="h6" sx={{ color: 'white' }}>
                              No.of.posts :
                            </Typography>
                            <Typography variant="h7" sx={{ color: 'white' }}>
                              {greddit.posts}
                            </Typography>
                          </CardContent>
                        </Card>
                        <br />
                      </div>
                    }

                  </div>);
                }
              }) : null}
            </div>
            <div >
              {greddits ? greddits.map((greddit, ind) => {
                if (!search || greddit.name.toLowerCase().includes(search.toLowerCase())) {
                  return (<div>
                    {(greddit.email !== email && !greddit.users.includes(email) && greddit.blockedusers.includes(email)) &&
                      <div>
                        <Card sx={{ width: 600 }} style={{ backgroundColor: '#e0566d', margin: 'auto' }}>
                          <CardHeader
                            style={{ color: 'white', textAlign: 'left' }}
                            title={greddit.name}
                            action={
                              <>
                                {
                                  greddit.users.includes(email) && greddit.email === email &&
                                  <div>
                                    <Button variant="contained" onClick={() => { func5(ind) }} style={{ backgroundColor: 'white', color: '#e0566d', marginRight: "10px" }}>
                                      Open
                                    </Button>
                                    <Button disabled={true} variant="contained" style={{ backgroundColor: 'white' }}>
                                      Leave
                                    </Button>
                                  </div>
                                }
                                {
                                  greddit.users.includes(email) && greddit.email !== email &&
                                  <div>
                                    <Button variant="contained" onClick={() => { func5(ind) }} style={{ backgroundColor: 'white', color: '#e0566d', marginRight: "10px" }}>
                                      Open
                                    </Button>
                                    <Button variant="contained" onClick={() => { func7(ind) }} style={{ backgroundColor: 'white', color: '#e0566d' }}>
                                      Leave
                                    </Button>
                                  </div>
                                }
                                {
                                  !greddit.users.includes(email) && greddit.blockedusers.includes(email) &&
                                  <div>
                                    <Button variant="contained" disabled={true} onClick={() => { func6(ind) }} style={{ backgroundColor: 'white', marginRight: "10px" }}>
                                      join
                                    </Button>
                                  </div>
                                }
                                {
                                  !greddit.users.includes(email) && !greddit.blockedusers.includes(email) &&
                                  <div>
                                    <Button variant="contained" onClick={() => { func6(ind) }} style={{ backgroundColor: 'white', color: '#e0566d', marginRight: "10px" }}>
                                      join
                                    </Button>
                                  </div>
                                }
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
                              {greddit.users.length}
                            </Typography>
                            <Typography variant="h6" sx={{ color: 'white' }}>
                              No.of.posts :
                            </Typography>
                            <Typography variant="h7" sx={{ color: 'white' }}>
                              {greddit.posts}
                            </Typography>
                          </CardContent>
                        </Card>
                        <br />
                      </div>
                    }

                  </div>);
                }
              }) : null}
            </div>
          </div>
        }

      </div>
    )
  }
}
