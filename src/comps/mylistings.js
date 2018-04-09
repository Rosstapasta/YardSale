import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../ducks/reducer';
import axios from 'axios';
import pin from './media/pin2.png';
import paper from './media/paper.png';

class MyListings extends Component {
  constructor(){
    super()

    this.state = {
      userL: [],
      delete: false,
      deleteProp: ''

    }

    this.userListings = this.userListings.bind(this);
    this.deleteListing = this.deleteListing.bind(this);
  }

  userListings(){
    console.log('hit userListings')
    axios.get('/userlistings').then( res => this.setState({userL: res.data, delete: false, deleteProp: ''},
    () => console.log(this.state.userL, "state from my listings")))

  }

  componentWillMount(){
    window.scrollTo(0, 0)
    const { history } = this.props;
    this.props.getUser(history);

    this.userListings();
  }

  deleteListing(){

    const { deleteProp } = this.state;

    axios.delete(`/deletelisting?list=${deleteProp}`).then(
      res => { this.userListings()}
    )
  }
  
  render() {

    var listings = this.state.userL.map( (lst, i) => {

      return (
        <div className="listOuter">
        {/* <img className='paper' src={paper}/> */}
            <div key={i} className="listBody">

              <div className='rowDisp2'>
                <img id='rotate' className="pin" src={pin} alt='pin'/>
              <h2 className="listTitle">{lst.item}</h2>
                <img className='pin' src={pin} alt='pin'/>
              </div>

              <img className="listImg" src={`https://s3-us-west-2.amazonaws.com/yardsaleapp333/${lst.img}.jpeg`}/>
              <div className='placeholder'/>
              <div className="rowDisp">

              <div className='rowDisp'>
                <button className="lstButton">edit</button>
                <button className="lstButton" onClick={() => this.setState({delete: true, deleteProp: lst.item_id })}>delete</button>
              </div>
              

              </div>
            
            </div>


        </div>
        
      )
    })

    return (
      <div className="compBody">

        <h1 id='mylistings' className='GarageSale'>My Listings</h1>

        {listings}

        { this.state.delete ? <div>{

        <div className='deleteConfirm'>
          <h1>Are you sure?</h1>
          <div>
          <button className='lstButton' onClick={ () => this.deleteListing()}>Yes</button>
          <button className='lstButton' onClick={() => this.setState({delete: false, deleteProp: ''})}>No</button>
          </div>
        </div>

        }</div> :
        
        <div/>

        }
        

       
      </div>
    );
  }
}

export default connect(state => state, {getUser})(MyListings);