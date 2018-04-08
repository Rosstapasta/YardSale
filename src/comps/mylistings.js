import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../ducks/reducer';
import axios from 'axios';

class MyListings extends Component {
  constructor(){
    super()

    this.state = {
      userL: []

    }

    this.userListings = this.userListings.bind(this);
  }

  userListings(){
    console.log('hit userListings')
    axios.get('/userlistings').then( res => this.setState({userL: res.data},
    () => console.log(this.state.userL, "state from my listings")))

  }

  componentWillMount(){
    window.scrollTo(0, 0)
    const { history } = this.props;
    this.props.getUser(history);

    this.userListings();
  }
  
  render() {

    var listings = this.state.userL.map( (lst, i) => {
      return (
        <div key={i} className="listBody">

          <img className="listImg" src={`https://s3-us-west-2.amazonaws.com/yardsaleapp333/${lst.img}.jpeg`}/>
          <div className='placeholder'/>
          <div className="rowDisp">
          <button className="lstButton">edit</button>
          <button className="lstButton">delete</button>
          </div>

        </div>
      )
    })

    return (
      <div className="compBody">

        <h1 className='GarageSale'>My Listings</h1>

        {listings}
       
      </div>
    );
  }
}

export default connect(state => state, {getUser})(MyListings);