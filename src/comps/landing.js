import React, { Component } from 'react';
import axios from 'axios';

class Landing extends Component {
  constructor(){
    super()

    this.state = {
      listings: []
    }
  }

  componentWillMount(){
    window.scrollTo(0, 0);

    axios.get('/landing').then( res => {
      this.setState({ listings: res.data })
    })
  }

  render() {
    console.log(this.state.listings)
    return (
      <div className="compBody">
        <p>landing</p>
       
      </div>
    );
  }
}

export default Landing;