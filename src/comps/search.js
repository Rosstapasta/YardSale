import React, { Component } from 'react';
import Navbar from './navbar';

class Search extends Component {

  constructor(props){
    super(props)

    this.state ={
      cat: ''
    }
  }

  render() {
    console.log(this.props.match.params.cat)
    return (
      <div>
        <Navbar/>
        <p>{this.props.match.params.cat}</p>
        <p>search</p>
       
      </div>
    );
  }
}

export default Search;