import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../ducks/reducer';
import { Link } from 'react-router-dom';

class Wiz2 extends Component {
  render() {
    return (
      <div className="compBody">
        <h1>Step 2</h1>


        <div className='inputsBody'>

            <div className='inputs'>
            <h2>City</h2>
            <input className='profileInput'/>
            </div>

            <div className='inputs'>
            <h2>State</h2>
            <input className='profileInput'/>
            </div>

            <div className='inputs'>
            <h2>Category</h2>
            <div className='placeholder'/>
                <select className='profileInput'>             
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                </select>
            </div>

        </div>



        <div className='inputs'>
            <Link to='/wiz1'><h1>back</h1></Link>
            <div className='placeholder'/>
            <div className='placeholder'/>
            <Link to='/wiz3'><h1>next</h1></Link>
        </div>
        
      </div>
    );
  }
}

export default connect(state => state, {getUser})(Wiz2);