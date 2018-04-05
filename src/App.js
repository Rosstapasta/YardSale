import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './comps/landing';
import Search from './comps/search';
import Listing from './comps/listing';
import Profile from './comps/profile';
import AddListing from './comps/addlisting';
import MyListings from './comps/mylistings';
import Navbar from './comps/navbar';
// import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        
        <div style={{ position: 'relative', zIndex: "2" }}>
        <Navbar/>
        </div>

          <div style={{ position: 'relative', zIndex: "1" }}>
          <Switch>
            <Route path='/' component={ Landing } exact/>
            <Route path='/search/:cat' component={ Search }/>
            <Route path='/listing' component={ Listing }/>
            <Route path='/profile' component={ Profile }/>
            <Route path='/addlisting' component={ AddListing }/>
            <Route path='/mylistings' component={ MyListings }/>
          </Switch>
          </div>  
      </div>
    );
  }
}

export default App;
