import React, { Component } from 'react';
import axios from "axios";
import pin from './media/pin2.png';


class Item extends Component {
  constructor(){
    super()
    this.state = {
      item: {},
      contactB: false,
      sender: 0,
      message: ''
    }
    this.sendText = this.sendText.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  componentWillMount(){
    window.scrollTo(0, 0);

    const { itemId } = this.props.match.params;
    axios.post('/viewlisting', {itemId} ).then(
        res => this.setState({item: res.data[0]})
    )
  }

  sendText(){
    const { sender, message } = this.state;
    const { phone } = this.state.item;
    axios.post('/twiliotest', {sender, message, phone} ).then( res =>
        console.log('sent')
    )

  }

  handleChange(prop, val){
    this.setState({[prop]: val})
  }

  render() {
    console.log(this.state.item, "view listing")
    // const { item } = this.state;
    return (
      <div className="compBody">

        <div className='lvtop'>
        <h1 className='lvText'>{this.state.item.item}</h1>
        <h1 className='lvText'>${this.state.item.price}</h1>
        </div>

        <div id='pol' className='imgwithimg'>
            <img id='pin1' className="pinp1" src={pin} alt='pin'/>
            <img id='pin2' className='pinp2' src={pin} alt='pin2'/>
            {/* <img id='pin3' className="pinp1" src={pin} alt='pin'/>
            <img id='pin4' className='pinp2' src={pin} alt='pinp2'/> */}

            <img className='editImg' src={`https://s3-us-west-2.amazonaws.com/yardsaleapp333/${this.state.item.img}.jpeg`} />
        </div>

        <h2 className='lvDes'>{this.state.item.descript}</h2>

        <button className="lvbutton" onClick={() => this.setState({contactB: true})}>contact seller</button>

        { this.state.contactB ? <div>{
          <div className='textSeller'>
            <h3>your number</h3>
            <input onChange={(e) => this.handleChange('sender', e.target.value)}/>

            <h3>Message</h3>
            <textarea className='lvta' onChange={(e) => this.handleChange('message', e.target.value)}/>

            <button id='mta' className='loginButton' onClick={() => this.sendText()}>Send</button>

            <button id='mta' className='loginButton' onClick={() => this.setState({ contactB: false})}>cancel</button>
          </div>
        }</div>
        : <div/>}
       
      </div>
    );
  }
}

export default Item;