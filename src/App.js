import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './comps/landing';
import Search from './comps/search';
import Listing from './comps/listing';
import Profile from './comps/profile';
import AddListing from './comps/addlisting';
import MyListings from './comps/mylistings';
import Navbar from './comps/navbar';
import Wiz1 from './comps/wiz/wiz1';
import Wiz2 from './comps/wiz/wiz2';
import Wiz3 from './comps/wiz/wiz3';
import Edit from './comps/editListing';
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
            <Route path='/listing/:itemId' component={ Listing }/>
            <Route path='/profile' component={ Profile }/>
            <Route path='/addlisting' component={ AddListing }/>
            <Route path='/mylistings' component={ MyListings }/>
            <Route path='/wiz1' component={ Wiz1}/>
            <Route path='/wiz2' component={ Wiz2}/> 
            <Route path='/wiz3' component={ Wiz3}/>
            <Route path='/edit/:listId' component={ Edit }/>
          </Switch>
          </div>  
      </div>
    );
  }
}

export default App;
