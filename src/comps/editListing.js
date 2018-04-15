import React, { Component } from 'react';
import axios from 'axios';
import pin from './media/pin2.png';

export default class Edit extends Component{

    constructor(){
        super()

        this.state ={
            image: '',
            item: '',
            price: 0,
            city: '',
            stateUSA: ''

        }
        this.updatelisting = this.updatelisting.bind(this);
    }

    componentWillMount(){
        window.scrollTo(0, 0);

        const { listId } = this.props.match.params;
        axios.post('/editlisting', {listId} ).then(
            res => this.setState({item: res.data[0].item, price: res.data[0].price, city: res.data[0].city, stateUSA: res.data[0].stateusa, image: res.data[0].img})
        )
    }

    updatelisting(){

    }
    
  render(){
      console.log(this.state, "editlisting")
      const { listing } = this.state;
    return(
        <div className="compBody">

            <h2 className="editText">Item</h2>
            <input className='editInput' value={this.state.item}/>

            <div id='pol' className='imgwithimg'>
            {/* <img id='pin1' className="pinp1" src={pin} alt='pin'/>
            <img id='pin2' className='pinp2' src={pin} alt='pin2'/> */}
            {/* <img id='pin3' className="pinp1" src={pin} alt='pin'/>
            <img id='pin4' className='pinp2' src={pin} alt='pinp2'/> */}

            <img className='editImg' src={`https://s3-us-west-2.amazonaws.com/yardsaleapp333/${this.state.image}.jpeg`} />
            </div>

            <h2 className='editText'>Price</h2>
            <input className='editInput' value={`$${this.state.price}`}/>

            <h2 className='editText'>City</h2>
            <input className='editInput' value={this.state.city}/>

            <h2 className='editText'>State</h2>
            <input className='editInput' value={this.state.stateUSA}/>

            <div className='placeholder'/>
            <div className='rowDisp'>
                <button className='lstButton'>Cancel</button>
                <button className='lstButton'>Update</button>
            </div>
            <div className='placeholder'/>


        </div>
    )
  }
}