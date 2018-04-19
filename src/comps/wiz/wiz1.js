import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser, updateName, updateDes, updatePrice } from '../../ducks/reducer';
import { Link } from 'react-router-dom';


class Wiz1 extends Component {

  componentWillMount(){
    window.scrollTo(0, 0);
    const { history } = this.props;
    this.props.getUser(history)
  }

  render() {
    return (
      <div className="compBody">

        <div className='titlecon'>
          <h1 id='mylistings3' className='searchTitle2'>Step 1</h1>
        </div>

        <div className='wizDisp'>

          <div id='wizDisp2' className='inputsBody'>

              <div className='inputs'>
              <h2>Item</h2>
              <input id='profileInput2' className='profileInput' value={this.props.name}onChange={(e) => this.props.updateName(e.target.value)}/>
              </div>

              <div className='inputs'>
              <h2>Price</h2>
              <h2 className="dolladollabill">$</h2><input id='profileInput2' className='profileInput' value={this.props.price} onChange={(e) => this.props.updatePrice(e.target.value)}/>
              </div>

          </div>
          
          <div className='inputsBody'>

              <div id='inputsR' className='inputs'>
              <h2 className='wizText'>Description</h2>
              <div className='placeholder'/>
              <textarea className='textArea' value={this.props.description} onChange={(e) => this.props.updateDes(e.target.value)}/>
              </div>

          </div>

        </div>

        <div className='titlecon'>
        <Link to='/wiz2' style={{textDecoration: 'none', color: 'rgb(124, 211, 177)'}}><h1>next</h1></Link>
        </div>

      </div>
    );
  }
}

export default connect(state => state, {getUser, updateName, updateDes, updatePrice})(Wiz1);