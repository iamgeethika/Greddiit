import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import BookmarksIcon from '@mui/icons-material/Bookmarks';

export default function Dashboard() {
  const navigate = useNavigate();
  function func() {
    localStorage.removeItem("email");
    navigate("/");
  }
  function func1() {
    navigate("/profile");
  }
  function func2() {
    navigate("/mysubgreddit");
  }
  function func3() {
    navigate("/subgreddits");
  }
  function func4() {
    navigate("/savedposts");
  }
  if (!(localStorage.getItem("email"))) {
    window.location = "/"
  }
  else {
    return (
      <Box sx={{ flexGrow: 1 }}>
          <AppBar style={{ backgroundColor: '#ffffff7c' }} position="static">
            <Toolbar>
            <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2, color: 'Black' }}
          >
            <MenuIcon />
          </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'Black' }}>
              </Typography>
              <IconButton id='button7' size="large"  type="submit" onClick={() => { func3() }} variant="contained" sx={{color: 'Black' }} >{<HomeIcon />}</IconButton>
              <IconButton id='button8' size="large"  type="submit" onClick={() => { func2() }} variant="contained" sx={{color: 'Black' }} >{<DynamicFeedIcon />}</IconButton>
              <IconButton id='button9' size="large"  type="submit" onClick={() => { func4() }} variant="contained" sx={{color: 'Black' }} >{<BookmarksIcon/>}</IconButton>
              <IconButton id='button6' size="large"  type="submit" onClick={() => { func1() }} variant="contained" sx={{color: 'Black' }} >{<AccountCircleIcon />}</IconButton>
              <IconButton id='button5' type="submit" onClick={() => { func() }} variant="contained" sx={{color: 'Black' }} >{<LogoutIcon />}</IconButton>
            </Toolbar>
          </AppBar>
        </Box>
    )
  }
}
