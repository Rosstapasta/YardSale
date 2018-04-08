import React, { Component } from 'react';

class Landing extends Component {

  componentWillMount(){
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div className="compBody">
        <p>landing</p>
       
      </div>
    );
  }
}

export default Landing;