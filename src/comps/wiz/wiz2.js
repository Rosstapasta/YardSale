import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser, updateCity, updateState, updateCat } from '../../ducks/reducer';
import { Link } from 'react-router-dom';

class Wiz2 extends Component {
  render() {
    return (
      <div className="compBody">
        <h1 className='ball'>2</h1>


        <div className='inputsBody'>

            <div className='inputs'>
            <h2>City</h2>
            <input className='profileInput' value={this.props.city} onChange={(e) => this.props.updateCity(e.target.value)}/>
            </div>

            <div className='inputs'>
            <h2>State</h2>
            <input className='profileInput' value={this.props.stateUSA} onChange={(e) => this.props.updateState(e.target.value)}/>
            </div>

            <div className='inputs'>
            <h2>Category</h2>
            <div className='placeholder'/>
                <select value={this.props.cat} className='profileInput' onChange={(e) => this.props.updateCat(e.target.value)}>             
                    <option value='cat 1'>cat 1</option>
                    <option value='cat 2'>cat 2</option>
                    <option value='cat 3'>cat 3</option>
                    <option value='cat 4'>cat 4</option>
                    <option value='cat 5'>cat 5</option>
                    <option value='cat 6'>cat 6</option>
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

export default connect(state => state, {getUser, updateCity, updateState, updateCat })(Wiz2);