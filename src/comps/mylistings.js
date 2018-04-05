import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../ducks/reducer'

class MyListings extends Component {
  constructor(){
    super()

    this.state = {

    }
  }

  componentWillMount(){
    const { history } = this.props;
    this.props.getUser(history)
  }
  
  render() {
    return (
      <div className="compBody">

        <p>my listings</p>
       
      </div>
    );
  }
}

export default connect(state => state, {getUser})(MyListings);