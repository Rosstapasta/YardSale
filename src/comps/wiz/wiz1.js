import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../ducks/reducer';
import { Link } from 'react-router-dom';

class Wiz1 extends Component {
  render() {
    return (
      <div className="compBody">

        <h2>Step 1</h2>

        <div className='inputsBody'>

            <div className='inputs'>
            <h2>Item</h2>
            <input className='profileInput'/>
            </div>

            <div className='inputs'>
            <h2>Price</h2>
            <input className='profileInput'/>
            </div>

            <div id='inputsR' className='inputs'>
            <h2>Description</h2>
            <div className='placeholder'/>
            <textarea className='textArea'/>
            </div>

        </div>


        <Link to='/wiz2'><h1>next</h1></Link>
       
      </div>
    );
  }
}

export default connect(state => state, {getUser})(Wiz1);