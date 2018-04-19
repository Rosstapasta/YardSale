import React, { Component } from 'react';
import './comps.css';
import { Link } from 'react-router-dom';
import { getUser } from '../ducks/reducer';
import { connect } from 'react-redux';
import axios from 'axios';

class Profile extends Component {
  constructor(){
    super()

    this.state ={
      fname: '',
      lname: '',
      phone: 0,
      fname2: '...loading'
    }
    this.handleChange = this.handleChange.bind(this);
    this.updateP = this.updateP.bind(this);
  }

  componentWillMount(){
    window.scrollTo(0, 0);
    const { history } = this.props;
    this.props.getUser(history);

    axios.get('/getuser').then( res => {
      this.setState({fname2: res.data[0].first_name, fname: res.data[0].first_name, lname: res.data[0].last_name, phone: res.data[0].phone})
    })
  }

  updateP(){
    const { fname, lname, phone} = this.state;
    axios.put('/updatep', {fname, lname, phone}).then( res => {
      this.setState({ fname2: fname })
    })
  }

  handleChange(prop, val){
    this.setState({[prop]: val})
  }

  render() {

    console.log(this.state.fname, this.state.lname)
    return (
      <div className="compBody">

          <div className='profile1'>

              <div className="placeholder"></div>
              <div className="placeholder"></div>
              
              <div id='rd2223' className='rowDisp2'>
              <h2 className='profileText'>Welcome {this.state.fname2}</h2>
            </div>

              <div className="placeholder"></div>

              <div className="pInputRow">
                <h2 className='profileText' style={{ fontFamily: 'Stylish'}}> First Name</h2>
                <div className="placeholder"></div>
                <input value={this.state.fname} id='pinput2' className="profileInput" onChange={ (e) => this.handleChange('fname', e.target.value)}/>
              </div>

              <div className="pInputRow">
                <h2 className='profileText' style={{ fontFamily: 'Stylish'}}>Last Name</h2>
                <div className="placeholder"></div>
                <input value={this.state.lname} id='pinput2' className="profileInput" onChange={ (e) => this.handleChange('lname', e.target.value)}/>
              </div>

                

              <div className="pInputRow">
                <h2 className='profileText' style={{ fontFamily: 'Stylish'}}>Phone</h2>
                <div className="placeholder"></div>
                <div className='placeholder'></div>
                <div className='placeholder'></div>
                <input value={this.state.phone} id='pinput2' className="profileInput" onChange={ (e) => this.handleChange('phone', e.target.value)}/>
              </div>


              <div className='placeholder'></div>
        
              <div className='loginButton' onClick={() => this.updateP()}>Update Profile</div>

              <div className="placeholder"></div>

            <Link style={{ textDecoration: 'none' }} to='/wiz1'><button className="listings">New Listing</button></Link>

              <div className="placeholder"></div>

            <Link style={{ textDecoration: 'none' }} to='/mylistings'><button className="listings">My Listings</button></Link>

              <div className="placeholder"></div>

            <Link style={{ textDecoration: 'none' }} to='/myfavorites'><button className="listings">Favorites</button></Link>


              <div className="placeholder"></div>

              <a href={ process.env.REACT_APP_LOGOUT } style={{textDecoration: 'none', color: 'white'}}><button className="loginButton">Logout</button></a>

          </div>

          <div className='profile2'>
          <div className="placeholder"></div>

            <div id='rd222' className='rowDisp2'>
              <h2 id='pt22' className='profileText'>Welcome {this.state.fname2}</h2>
            </div>
          
             <div className="placeholder"></div>
            <div className='rowDisp2'>
            <div className="placeholder"></div>
            <Link style={{ textDecoration: 'none' }} to='/wiz1'><button className="listings">New Listing</button></Link>

              

            <Link style={{ textDecoration: 'none' }} to='/mylistings'><button className="listings">My Listings</button></Link>

              

            <Link style={{ textDecoration: 'none' }} to='/myfavorites'><button className="listings">Favorites</button></Link>
            <div className="placeholder"></div>
            </div>
                <div className="placeholder"></div>
                <div className="placeholder"></div>

            <div id='rd222' className='rowDisp2'>

              <div className="pInputRow">
                <h2 className='profileText' style={{ fontFamily: 'Stylish'}}> First Name</h2>
                <div className="placeholder"></div>
                <input value={this.state.fname} id='pinput2' className="profileInput" onChange={ (e) => this.handleChange('fname', e.target.value)}/>
              </div>

              <div className="pInputRow">
                <h2 className='profileText' style={{ fontFamily: 'Stylish'}}>Last Name</h2>
                <div className="placeholder"></div>
                <input value={this.state.lname} id='pinput2' className="profileInput" onChange={ (e) => this.handleChange('lname', e.target.value)}/>
              </div>

              <div className="pInputRow">
                <h2 className='profileText' style={{ fontFamily: 'Stylish'}}>Phone</h2>
                <div className="placeholder"></div>
                <input value={this.state.phone} id='pinput2' className="profileInput" onChange={ (e) => this.handleChange('phone', e.target.value)}/>
              </div>
              
            </div>


              <div className='placeholder'></div>

            <div id='rd3' className='rowDisp2'>
              <div className='loginButton' onClick={() => this.updateP()}>Update Profile</div>

              <a href={ process.env.REACT_APP_LOGOUT } style={{textDecoration: 'none', color: 'white'}}><button className="loginButton">Logout</button></a>

            </div>


              <div className="placeholder"></div>

          
          </div>


       
      </div>
    );
  }
}

export default connect(state => state, {getUser})(Profile);