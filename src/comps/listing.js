import React, { Component } from 'react';
import Navbar from './navbar';

class Item extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <p>listing</p>
       
      </div>
    );
  }
}

export default Item;