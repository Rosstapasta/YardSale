import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser, updateName, updateDes, updatePrice } from '../../ducks/reducer';
import { Link } from 'react-router-dom';


class Wiz1 extends Component {
  render() {
      console.log(this.props, "this.props wiz1")
    return (
      <div className="compBody">

        <h2 className='ball'>1</h2>

        <div className='inputsBody'>

            <div className='inputs'>
            <h2>Item</h2>
            <input className='profileInput' value={this.props.name}onChange={(e) => this.props.updateName(e.target.value)}/>
            </div>

            <div className='inputs'>
            <h2>Price</h2>
            <input className='profileInput' value={this.props.price}onChange={(e) => this.props.updatePrice(e.target.value)}/>
            </div>

            <div id='inputsR' className='inputs'>
            <h2>Description</h2>
            <div className='placeholder'/>
            <textarea className='textArea' value={this.props.description} onChange={(e) => this.props.updateDes(e.target.value)}/>
            </div>

        </div>


        <Link to='/wiz2'><h1>next</h1></Link>
       
      </div>
    );
  }
}

export default connect(state => state, {getUser, updateName, updateDes, updatePrice})(Wiz1);