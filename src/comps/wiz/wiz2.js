import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser, updateCity, updateState, updateCat } from '../../ducks/reducer';
import { Link } from 'react-router-dom';

class Wiz2 extends Component {

  componentWillMount(){
    window.scrollTo(0, 0);
    const { history } = this.props;
    this.props.getUser(history)
  }

  render() {
    return (
      <div className="compBody">
        <div className='placeholder'/>
        <div className="inputs">
        <Link style={{textDecoration: 'none', color: 'black'}} to='/wiz1'><h2 className='ball'>1</h2></Link>
        <div className="placeholder"/>
        <h2 id='ball2' className='ball'>2</h2>
        <div className="placeholder"/>
        <Link style={{textDecoration: 'none', color: 'black'}} to='/wiz3'><h2 className='ball'>3</h2></Link>

        </div>


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
                    <option value='Antiques'>Antiques</option>
                    <option value='Cars'>Cars</option>
                    <option value='Clothing'>Clothing</option>
                    <option value='Collectables'>Collectables</option>
                    <option value='Computers'>Computers</option>
                    <option value='Electronics'>Electronics</option>
                    <option value='Instruments'>Instruments</option>
                    <option value='Misc'>Other/Misc</option>
                </select>
            </div>

        </div>


        <div className='inputs'>
            <Link to='/wiz1' style={{textDecoration: 'none', color: 'rgb(124, 211, 177)'}}><h1>back</h1></Link>
            <div className='placeholder'/>
            <div className='placeholder'/>
            <Link to='/wiz3' style={{textDecoration: 'none', color: 'rgb(124, 211, 177)'}}><h1>next</h1></Link>
        </div>

        
      </div>
    );
  }
}

export default connect(state => state, {getUser, updateCity, updateState, updateCat })(Wiz2);