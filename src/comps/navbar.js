import React, { Component } from 'react';
import './comps.css';
import icon from './media/icon2.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Navbar extends Component {
  constructor(){
    super()

    this.state = {
      dropMenu: false,
      user: []
    }

  }

  componentWillMount(){
    axios.get('/checkauth').then( res => {
      this.setState({user: [res.data] })
    })
  }

  render(){
    console.log(this.state.user, "user info from navbar")
    return (
      <div className="topLayer">
          <div className="navBody">


              {/* desktop */}
            <div id="topE1" className='topEleme'>

              {this.state.user[0] ? <div>{<Link style={{ textDecoration: 'none' }} to='/profile'><div id="login22" className='loginButton'>Profile</div></Link>}</div> :
              <a style={{ textDecoration: 'none' }} href={ process.env.REACT_APP_LOGIN } ><div id="login22" className='loginButton'>login/register</div></a>}

              <Link to='/' style={{ textDecoration: 'none' }}><h2 id='gs' className="GarageSale">Yard Sale</h2></Link>
              
              <Link to='/search/none' style={{ textDecoration: 'none' }}><div id="login2" className="searchButton">~Search~</div></Link>
            </div>

            <div id="topE1" className='categories'>
            <Link to='/search/Antiques' style={{ textDecoration: 'none', color: 'white' }}><h3 className='catscats'>Antiques</h3></Link>
            <Link to='/search/Cars' style={{ textDecoration: 'none', color: 'white' }}><h3 className='catscats'>Cars</h3></Link>
            <Link to='/search/Clothing' style={{ textDecoration: 'none', color: 'white' }}><h3 className='catscats'>Clothing</h3></Link>
            <Link to='/search/Collectables' style={{ textDecoration: 'none', color: 'white' }}><h3 className='catscats'>Collectables</h3></Link>
            <Link to='/search/Computers' style={{ textDecoration: 'none', color: 'white' }}><h3 className='catscats'>Computers</h3></Link>
            <Link to='/search/Electronics' style={{ textDecoration: 'none', color: 'white' }}><h3 className='catscats'>Electronics</h3></Link>
            <Link to='/search/Instruments' style={{ textDecoration: 'none', color: 'white' }}><h3 className='catscats'>Instruments</h3></Link>
            <Link to='/search/Misc' style={{ textDecoration: 'none', color: 'white' }}><h3 className='catscats'>Other/Misc</h3></Link>
            </div>


              {/* mobile */}
            <div id="topE2" >

              <div className='MNE'>
                <div className="buttonsMobile">
                <Link to='/' style={{ textDecoration: 'none' }}><h2 className="GarageSale">Yard Sale</h2></Link>
                  
                </div>

                <div id="bm2" className="buttonsMobile"> 

                  {this.state.user[0] ? <div>{<Link style={{ textDecoration: 'none' }} to='/profile'><div id="login1" className='loginButton'>Profile</div></Link>}</div> :
                  <a style={{ textDecoration: 'none' }} href={ process.env.REACT_APP_LOGIN } ><div id="login1" className='loginButton'>login/register</div></a>}

                  <div className="placeholder"></div>

                  <Link to='/search/none' style={{ textDecoration: 'none' }}><div id="login1" className="searchButton" onClick={() => this.setState({dropMenu: false })}>Search</div></Link>

                </div>
              </div>

              {/* <div id='bm3' className='buttonsMobile'>
                <img src={}/>
              </div> */}
              <div id="bm3" className="buttonsMobile"> 
              <img onClick={() => this.setState({dropMenu: !this.state.dropMenu})} className="icon" src={ icon } alt='icon'/>
              </div>

            </div>

          </div>

          <div className={this.state.dropMenu ? 'dropCats slide' : 'dropCats'}>

            <div className="CatPositions">
            <div className="placeholder"></div>

            <Link to='/search/Antiques' style={{ textDecoration: 'none', color: 'white' }}><h3 className='catText' onClick={() => this.setState({dropMenu: !this.state.dropMenu})}>1 - Antiques</h3></Link>

            <Link to='/search/Cars' style={{ textDecoration: 'none', color: 'white' }}><h3 className='catText'  onClick={() => this.setState({dropMenu: !this.state.dropMenu})}>2 - Cars</h3></Link>

            <Link to='/search/Clothing' style={{ textDecoration: 'none', color: 'white' }}><h3 className='catText'  onClick={() => this.setState({dropMenu: !this.state.dropMenu})}>3 - Clothing</h3></Link>

            <Link to='/search/Collectables' style={{ textDecoration: 'none', color: 'white' }}><h3 className='catText'  onClick={() => this.setState({dropMenu: !this.state.dropMenu})}>4 - Collectables</h3></Link>

            <Link to='/search/Computers' style={{ textDecoration: 'none', color: 'white' }}><h3 className='catText'  onClick={() => this.setState({dropMenu: !this.state.dropMenu})}>5 - Computers</h3></Link>

            <Link to='/search/Electronics' style={{ textDecoration: 'none', color: 'white' }}><h3 className='catText'  onClick={() => this.setState({dropMenu: !this.state.dropMenu})}>6 - Electronics</h3></Link>

            <Link to='/search/Instruments' style={{ textDecoration: 'none', color: 'white' }}><h3 className='catText'  onClick={() => this.setState({dropMenu: !this.state.dropMenu})}>7 - Instruments</h3></Link>

            <Link to='/search/Misc' style={{ textDecoration: 'none', color: 'white' }}><h3 className='catText'  onClick={() => this.setState({dropMenu: !this.state.dropMenu})}>8 - Other/Misc</h3></Link>
            </div>

          </div>

      </div>
    );
  }
}

export default Navbar;