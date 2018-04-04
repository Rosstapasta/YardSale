import React, { Component } from 'react';
import './comps.css';
import icon from './media/icon.png';

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
              <h2 className="GarageSale">Yard Sale</h2>
              <button id="login2" className="searchButton">~Search~</button>
            </div>

            <div id="topE1" className='categories'>
              <h3>Cat 1</h3>
              <h3>Cat 2</h3>
              <h3>Cat 3</h3>
              <h3>Cat 4</h3>
              <h3>Cat 5</h3>
              <h3>Cat 6</h3>
            </div>


              {/* mobile */}
            <div id="topE2" className='topEleme'>

              <div className="buttonsMobile">
                <h2 className="GarageSale">Yard Sale</h2>
                <img onClick={() => this.setState({dropMenu: !this.state.dropMenu})} className="icon" src={ icon } alt='icon'/>
              </div>

              <div id="bm2" className="buttonsMobile">
                <button id="login1" className='loginButton'>login/register</button>
                <div className="placeholder"></div>
                <button id="login1" className="searchButton">Search</button>
              </div>

            </div>

          </div>

          <div className={this.state.dropMenu ? 'dropCats slide' : 'dropCats'}>
          
            <div className="CatPositions">
              <h3>Cat 1</h3>
              <h3>Cat 2</h3>
              <h3>Cat 3</h3>
              <h3>Cat 4</h3>
              <h3>Cat 5</h3>
              <h3>Cat 6</h3>
            </div>

          </div>

      </div>
    );
  }
}

export default Navbar;