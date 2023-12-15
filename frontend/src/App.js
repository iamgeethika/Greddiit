import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";
import Login from './Login';
import Profile from './Profile';
import Mysubgreddit from './Mysubgreddit';
import Subgreddit from './Subgreddit';
import Allsubgreddits from './Allsubgreddits';
import Greddit from './Greddit';
import Savedposts from './Savedposts'

// document.body.style.backgroundImage = linear-gradient(rgb(0,0,0,0.1),rgb(0,0,0,1)),url("https://wallpaperaccess.com/full/1381366.jpg"); 
document.body.style.backgroundAttachment="fixed";
function App() {
  return (
    <div className="App" id='app'>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/mysubgreddit' element={<Mysubgreddit />} />
          <Route path='/:name/subgreddit' element={<Subgreddit />} />
          <Route path='/subgreddits' element={<Allsubgreddits />} />
          <Route path='/:id/greddit' element={<Greddit/>} />
          <Route path='/savedposts' element={<Savedposts/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
