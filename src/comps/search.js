import React, { Component } from 'react';

class Search extends Component {

  constructor(props){
    super(props)

    this.state ={
      cat: ''
    }
  }

  render() {
    console.log(this.state.cat, "cat from state")
    return (
      <div className="compBody">
        <p>{this.props.match.params.cat}</p>
        <p>search</p>
       
      </div>
    );
  }
}

export default Search;