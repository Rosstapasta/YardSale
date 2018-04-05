import React, { Component } from 'react';
import './comps.css';
import { Link } from 'react-router-dom';
import { getUser } from '../ducks/reducer';
import { connect } from 'react-redux';

class Profile extends Component {
  constructor(){
    super()

    this.state ={

    }
  }

  componentWillMount(){
    const { history } = this.props;
    this.props.getUser(history)
  }

  render() {
    return (
      <div className="compBody">

          <div className='profile1'>

              <div className="placeholder"></div>

            <div className="pInputRow">
              <h2 style={{ fontFamily: 'Permanent Marker'}}>Email</h2>
              <div className="placeholder"></div>
              <input className="profileInput"/>
            </div>

            <div className="pInputRow">
              <h2 style={{ fontFamily: 'Permanent Marker'}}>Name</h2>
              <div className="placeholder"></div>
              <input className="profileInput"/>
            </div>

              <div className='placeholder'></div>
            <div className='loginButton'>Update Profile</div>

              <div className="placeholder"></div>

            <Link style={{ textDecoration: 'none' }} to='/addlisting'><button className="listings">New Listing</button></Link>

              <div className="placeholder"></div>

            <Link style={{ textDecoration: 'none' }} to='/mylistings'><button className="listings">My Listings</button></Link>


              <div className="placeholder"></div>

              <a href='http://localhost:3035/auth/logout' style={{textDecoration: 'none', color: 'white'}}><button className="loginButton">Logout</button></a>

          </div>


       
      </div>
    );
  }
}

export default connect(state => state, {getUser})(Profile);