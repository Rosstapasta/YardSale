import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../ducks/reducer'

class AddListing extends Component {
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

          <p>add listing</p>
       
      </div>
    );
  }
}

export default connect(state => state, {getUser})(AddListing);