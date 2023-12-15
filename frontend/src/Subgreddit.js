import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Dashboard from './Dashboard';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from "react";
import { useState } from 'react';
import axios from 'axios';
import { Card, CardActions, CardContent, CardHeader } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

function TabPanel(props) {
  const navigate = useNavigate();
  const { children, value, index, ...other } = props;
  const name = useParams();
  const email = localStorage.getItem("email");
  const [users, setusers] = useState([]);
  const [jrs, setjrs] = useState([]);
  const [blockedusers, setbu] = useState([]);
  const [reports, setreports] = useState([]);
  const [gredditid, setgredditid] = useState("");
  const [p, setp] = useState(0);


  useEffect(() => {
    axios.get('/api/getmygredditname', { params: { email: email, name: name.name } })
      .then(res => {
        setusers(res.data.users)
        setjrs(res.data.joiningrequests)
        setbu(res.data.blockedusers)
        setp(res.data.posts)
        setgredditid(res.data._id)
        axios.get('/api/getmyreports', { params: { subid: res.data._id } })
          .then(res1 => {
            setreports(res1.data)
            console.log(res1.data)
          })
          .catch(error => {
            console.log(error)
          });
        console.log(res.data.users)
      })
      .catch(error => {
        console.log(error)
      });

  }, []);

  function func1(ind) {
    axios
      .put("/api/editjoiningrequests", { email: email, name: name.name, e: jrs[ind] })
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .put("/api/editusers", { email: email, name: name.name, e: jrs[ind] })
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function func2(ind) {
    axios
      .put("/api/editjoiningrequests", { email: email, name: name.name, e: jrs[ind] })
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function func3(ind) {
    if (email === reports[ind].reportedon) {
      alert("cannot block moderator")
    }
    else {
      axios
        .put("/api/editbusers", { email: email, name: name.name, e: reports[ind].reportedon })
        .then((response) => {
          console.log(response.data);
          axios
            .put("/api/editusers1", { email: email, name: name.name, e: reports[ind].reportedon })
            .then((response) => {
              console.log(response.data);
              window.location.reload();
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
          alert("already blocked");
        });
    }
  }

  function func4(ind) {
    axios
      .post("/api/ignore", { id: reports[ind]._id })
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function func5(ind) {
    axios
      .post("/api/editreports", { id: reports[ind].postid })
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .post("/api/editposts", { id: reports[ind].postid })
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
    let k = p - 1;
    axios
      .put("/api/updateposts", { id: gredditid, posts: k })
      .then(function (response) {
        console.log(response);
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === 0 && (
        <div>
          <div>
            <Typography variant='h4'>USERS</Typography>
          </div>
          <br /><br />
          {users ? users.map((user, ind) => (
            <div>
              <Card style={{ backgroundColor: '#ffffff7d', margin: 'auto', width: 300 }}>
                <CardContent>
                  <TextField
                    value={user}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </CardContent>
              </Card>
              <br /><br />
            </div>
          )) : null}
          {blockedusers ? blockedusers.map((buser, ind) => (
            <div>
              <Card style={{ backgroundColor: '#ffffff7d', margin: 'auto', width: 300 }}>
                <CardContent>
                  <TextField
                    value={buser}
                    disabled={true}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </CardContent>
              </Card>
              <br /><br />
            </div>
          )) : null}
        </div>
      )}
      {value === 1 && (
        <Box>
          <div>

            <br /><br />
            {jrs.length ? jrs.map((jr, ind) => (
              <div>
                <Card style={{ backgroundColor: '#ffffff7d', margin: 'auto', width: 300 }}>
                  <CardContent>
                    <Typography>
                      {jr}
                    </Typography>
                    <br /><br />
                    <Button onClick={() => { func1(ind) }} type="submit" variant="contained" style={{ backgroundColor: '#e0566d' }}>Accept</Button>
                    <Button onClick={() => { func2(ind) }} type="submit" variant="contained" style={{ backgroundColor: '#e0566d' }}>Reject</Button>
                  </CardContent>
                </Card>
                <br /><br />
              </div>
            )) : null}
          </div>
        </Box>
      )}
      {value === 2 && (
        <Box>
          <div>
          </div>
        </Box>
      )}
      {value === 3 && (
        <Box>
          {
            reports.length ? reports.map((report, ind) => (
              <div>
                <br />
                <Card sx={{ width: 800 }} style={{ backgroundColor: '#e0566d', margin: 'auto' }}>
                  <CardContent style={{ textAlign: 'left' }}>
                    <Typography variant="h6" sx={{ color: 'white' }}>
                      REPORTED BY :
                    </Typography>
                    <Typography variant="h7" sx={{ color: 'white' }}>
                      {report.reportedby}
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'white' }}>
                      REPORTED USER :
                    </Typography>
                    <Typography variant="h7" sx={{ color: 'white' }}>
                      {report.reportedon}
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'white' }}>
                      CONCERN :
                    </Typography>
                    <Typography variant="h7" sx={{ color: 'white' }}>
                      {report.concern}
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'white' }}>
                      TEXT OF THE POST :
                    </Typography>
                    <Typography variant="h7" sx={{ color: 'white' }}>
                      {report.posttext}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button disabled={report.Ignore} onClick={() => { func3(ind) }} style={{ backgroundColor: 'white', color: '#e0566d' }} >
                      BLOCK USER
                    </Button>
                    <Button onClick={() => { func4(ind) }} style={{ backgroundColor: 'white', color: '#e0566d' }} >
                      IGNORE
                    </Button>
                    <Button disabled={report.Ignore} onClick={() => { func5(ind) }} style={{ backgroundColor: 'white', color: '#e0566d' }} >
                      DELETE POST
                    </Button>
                  </CardActions>
                </Card>
                <br />
              </div>
            )) : null
          }
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  // value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  if (!(localStorage.getItem("email"))) {
    window.location = "/"
  }
  else {
    return (
      <div>
        <div>
          <Dashboard />
        </div>
        <div>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: '#e0566d', backgroundColor: '#e0566d' }}>
              <Tabs value={value} onChange={handleChange} style={{ textColor: 'black' }}>
                <Tab label="Users" {...a11yProps(0)} sx={{ color: 'white' }} />
                <Tab label="Joining Requests" {...a11yProps(1)} sx={{ color: 'white' }} />
                <Tab label="Stats" {...a11yProps(2)} sx={{ color: 'white' }} />
                <Tab label="Reported Page" {...a11yProps(3)} sx={{ color: 'white' }} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
            </TabPanel>
            <TabPanel value={value} index={1}>
            </TabPanel>
            <TabPanel value={value} index={2}>
            </TabPanel>
            <TabPanel value={value} index={3}>
            </TabPanel>
          </Box>
        </div>
      </div>
    );
  }
}