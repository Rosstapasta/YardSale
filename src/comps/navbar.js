import React, { Component } from 'react';
import './comps.css';
import icon from './media/icon.png';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  constructor(){
    super()

    this.state = {
      dropMenu: false
    }

  }

  render() {
    return (
      <div className="topLayer">
          <div className="navBody">


              {/* desktop */}
            <div id="topE1" className='topEleme'>
              <button id="login2" className='loginButton'>login/register</button>
              <Link to='/' style={{ textDecoration: 'none' }}><h2 className="GarageSale">Yard Sale</h2></Link>
              <Link to='/search/none' style={{ textDecoration: 'none' }}><button id="login2" className="searchButton">~Search~</button></Link>
            </div>

            <div id="topE1" className='categories'>
            <Link to='/search/cat1' style={{ textDecoration: 'none', color: 'black' }}><h3>Cat 1</h3></Link>
            <Link to='/search/cat2' style={{ textDecoration: 'none', color: 'black' }}><h3>Cat 2</h3></Link>
            <Link to='/search/cat3' style={{ textDecoration: 'none', color: 'black' }}><h3>Cat 3</h3></Link>
            <Link to='/search/cat4' style={{ textDecoration: 'none', color: 'black' }}><h3>Cat 4</h3></Link>
            <Link to='/search/cat5' style={{ textDecoration: 'none', color: 'black' }}><h3>Cat 5</h3></Link>
            <Link to='/search/cat6' style={{ textDecoration: 'none', color: 'black' }}><h3>Cat 6</h3></Link>
            </div>


              {/* mobile */}
            <div id="topE2" className='topEleme'>

              <div className="buttonsMobile">
              <Link to='/' style={{ textDecoration: 'none' }}><h2 className="GarageSale">Yard Sale</h2></Link>
                <img onClick={() => this.setState({dropMenu: !this.state.dropMenu})} className="icon" src={ icon } alt='icon'/>
              </div>

              <div id="bm2" className="buttonsMobile">
                <button id="login1" className='loginButton'>login/register</button>
                <div className="placeholder"></div>
                <Link to='/search/none' style={{ textDecoration: 'none' }}><button id="login1" className="searchButton" onClick={() => this.setState({dropMenu: false })}>Search</button></Link>
              </div>

            </div>

          </div>

          <div className={this.state.dropMenu ? 'dropCats slide' : 'dropCats'}>

            <div className="CatPositions">
            <Link to='/search/cat1' style={{ textDecoration: 'none', color: 'white' }}><h3 onClick={() => this.setState({dropMenu: !this.state.dropMenu})}>Cat 1</h3></Link>
            <Link to='/search/cat2' style={{ textDecoration: 'none', color: 'white' }}><h3 onClick={() => this.setState({dropMenu: !this.state.dropMenu})}>Cat 2</h3></Link>
            <Link to='/search/cat3' style={{ textDecoration: 'none', color: 'white' }}><h3 onClick={() => this.setState({dropMenu: !this.state.dropMenu})}>Cat 3</h3></Link>
            <Link to='/search/cat4' style={{ textDecoration: 'none', color: 'white' }}><h3 onClick={() => this.setState({dropMenu: !this.state.dropMenu})}>Cat 4</h3></Link>
            <Link to='/search/cat5' style={{ textDecoration: 'none', color: 'white' }}><h3 onClick={() => this.setState({dropMenu: !this.state.dropMenu})}>Cat 5</h3></Link>
            <Link to='/search/cat6' style={{ textDecoration: 'none', color: 'white' }}><h3 onClick={() => this.setState({dropMenu: !this.state.dropMenu})}>Cat 6</h3></Link>
            </div>

          </div>

      </div>
    );
  }
}

export default Navbar;