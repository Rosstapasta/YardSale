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
      senderName: '',
      email: '',
      message: '',
      like: [{item_id: 0}],
      user: [],
      likeCount: [{count: 0}],
      buttonSwitch: true

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
     
        this.setState({like: res.data, buttonSwitch: false })
      }
    })

    this.numOfLikes();
  }


  like(){
    const { itemId } = this.props.match.params;
    const { likes } = this.state.item;
    var newLike = likes;
    newLike++;
    
    if(this.state.buttonSwitch === true){
      axios.post('/newlike', {itemId, newLike} ).then( res => {
        this.setState({ like: res.data }, this.numOfLikes())
      });
      
    }
    
    this.setState({buttonSwitch: false});


  }

  unLike(){
    const { itemId } = this.props.match.params;
    
    const { likes } = this.state.item;
    var newLike = likes;
    newLike--;
    
    if(this.state.buttonSwitch === false){
      axios.delete(`/unlike?itemId=${itemId}&newLike=${newLike}`).then( res => {
        this.setState({ like: [{item_id: 0}, this.numOfLikes()] })
      });
      
    }
    
    this.setState({buttonSwitch: true});
  }


  sendText(){
    const { sender, message, senderName, email } = this.state;
    const { phone } = this.state.item;
    axios.post('/twiliotest', {sender, message, phone, senderName, email} ).then( res =>
        this.setState({contactB: false})
    )
  }

  handleChange(prop, val){
    this.setState({[prop]: val})
  }

  render() {

    return (
      <div className="compBody">

        <div id='viewMobile' className='lvtop'>
          <h1 className='lvText'>{this.state.item.item}</h1>
          <h1 className='lvText2'>${this.state.item.price}</h1><h1 className='lvText2'>likes {this.state.likeCount[0].count}</h1>
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

            <button className="lvb2" onClick={() => this.setState({contactB: true})}>contact seller</button>

          </div>

          


          <div id='' className='pol'>
              <img id='editImg2' className='editImg' src={`https://s3-us-west-2.amazonaws.com/yardsaleapp333/${this.state.item.img}.jpeg`} alt='img'/>
          

            {this.state.user[0] ? <div>{
      
            <div>
              {this.state.like[0].item_id !== 0 ? <div>{
                <img onClick={ () => this.unLike()} className="heart" src={heart} alt='img'/>
              }</div> : 
              <img onClick={() => this.like()}  className="heart" src={heartE} alt='img'></img>
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
        

        <div id='viewMobile' className='lvtop'>
        <button className="lvbutton" onClick={() => this.setState({contactB: true})}>contact seller</button>
        </div>

        { this.state.contactB ? <div>{
          <div id='dc2' className='deleteConfirm'>

            <div className='rowDisp'>
              <h3 id='searchT2' className='searchT' >Name</h3>
              &nbsp;&nbsp;&nbsp;
              <input onChange={(e) => this.handleChange('senderName', e.target.value)} id='si22' className='searchInput'/>
            </div>

            <div className='rowDisp'>
              <h3 id='searchT2' className='searchT' >Email{`   `}</h3>
              &nbsp;&nbsp;&nbsp;
              <input onChange={(e) => this.handleChange('email', e.target.value)} id='si22' className='searchInput'/>
            </div>

            <div className='rowDisp'>
              <h3 id='searchT2' className='searchT' >Number</h3>
              <input onChange={(e) => this.handleChange('sender', e.target.value)} id='si22' className='searchInput'/>
            </div>

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