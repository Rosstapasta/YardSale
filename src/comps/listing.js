import React, { Component } from 'react';
import axios from "axios";
import heart from './media/heart.png';
import heartE from './media/heartempty.png';


class Item extends Component {
  constructor(){
    super()
    this.state = {

      item: {},
      contactB: false,
      sender: 0,
      message: '',
      like: [{item_id: 0}],
      user: [],
      likeCount: [{count: 0}]

    }

    this.sendText = this.sendText.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.like = this.like.bind(this);
    this.unLike = this.unLike.bind(this);
    this.numOfLikes = this.numOfLikes.bind(this);

  }

  numOfLikes(){
    const { itemId } = this.props.match.params;

    axios.get(`/getlikecount?itemId=${itemId}`).then( res => {
      this.setState({likeCount: res.data})
    })

  }


  componentWillMount(){
    window.scrollTo(0, 0);

    const { itemId } = this.props.match.params;
    axios.post('/viewlisting', {itemId} ).then(
        res => this.setState({item: res.data[0]})
    )

    axios.get('/checkauth').then( res => {
      this.setState({user: [res.data] })
    })

    axios.post('/userlike', {itemId}).then( res => {

      if(res.data[0]){
     
        this.setState({like: res.data })
      }
    })

    this.numOfLikes();
  }


  like(){

    const { itemId } = this.props.match.params;
    const { likes } = this.state.item;
    var newLike = likes;
    newLike++;

    axios.post('/newlike', {itemId, newLike} ).then( res => {
      this.setState({ like: res.data }, this.numOfLikes())
    });



  }

  unLike(){

    const { itemId } = this.props.match.params;

    const { likes } = this.state.item;
    var newLike = likes;
    newLike--;

    axios.delete(`/unlike?itemId=${itemId}&newLike=${newLike}`).then( res => {
      this.setState({ like: [{item_id: 0}, this.numOfLikes()] })
    });

  }


  sendText(){
    const { sender, message } = this.state;
    const { phone } = this.state.item;
    axios.post('/twiliotest', {sender, message, phone} ).then( res =>
        this.setState({contactB: false})
    )
  }

  handleChange(prop, val){
    this.setState({[prop]: val})
  }

  render() {

    console.log(this.state.likeCount, "likes")
    return (
      <div className="compBody">

        <div id='viewMobile' className='lvtop'>
          <h1 className='lvText'>{this.state.item.item}</h1>
          <h1 className='lvText2'>${this.state.item.price}</h1>
        </div>


        <div className="viewDire">


          <div id='viewDesk' className='lvtop'>
            <h1 className='lvText'>{this.state.item.item}</h1>
            <h1 className='lvText2'>${this.state.item.price}</h1>

            <div className="rowDisp">
              <h1 className='lvText'>{`${this.state.item.city}`}</h1>
              <h1 className='lvText'>{`, ${this.state.item.stateusa}`}</h1>
            </div>

            <h1 className='lvText2'>likes {this.state.likeCount[0].count}</h1>
          </div>

          


          <div id='' className='pol'>
              <img id='editImg2' className='editImg' src={`https://s3-us-west-2.amazonaws.com/yardsaleapp333/${this.state.item.img}.jpeg`} />
          

            {this.state.user[0] ? <div>{
      
            <div>
              {this.state.like[0].item_id !== 0 ? <div>{
                <img className="heart" src={heart} onClick={ () => this.unLike()}/>
              }</div> : 
              <img className="heart" src={heartE} onClick={() => this.like()}/>
              }
              </div>
            
              }</div> :  

              <div/>
            }

          </div>

        </div>


        <div id='viewMobile' className='rowDisp'>
          <h1 className='lvText'>{`${this.state.item.city}`}</h1>
          
          <h1 className='lvText'>{`, ${this.state.item.stateusa}`}</h1>
        </div>





        <h2 className='lvDes'>{this.state.item.descript}</h2>

        <button className="lvbutton" onClick={() => this.setState({contactB: true})}>contact seller</button>

        { this.state.contactB ? <div>{
          <div id='dc2' className='deleteConfirm'>
            <h3>your number</h3>
            <input onChange={(e) => this.handleChange('sender', e.target.value)}/>

            <h3>Message</h3>
            <textarea className='lvta' onChange={(e) => this.handleChange('message', e.target.value)}/>


            <div className='rowDisp'>
            <button id='searchB' className='lstButton' onClick={() => this.sendText()}>Send</button>

            <button 
            // id='mta' className='loginButton' 
            id='searchB' className='lstButton' 
            onClick={() => this.setState({ contactB: false})}>cancel</button>
            </div>
          </div>
        }</div>
        : <div/>}
       
      </div>
    );
  }
}

export default Item;