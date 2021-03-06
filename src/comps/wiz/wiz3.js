import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../ducks/reducer';
import Dropzone from 'react-dropzone';
import upload from 'superagent';
import { Link } from 'react-router-dom';
import axios from 'axios';


class Wiz3 extends Component {
  constructor(){
    super()

    this.state = {
      files: [],
      returnedF: [],
      imageKey: '',
      anime: false,
      tooLarge: false
    }

    this.createListing = this.createListing.bind(this);
  }

  componentWillMount(){
    window.scrollTo(0, 0);
    const { history } = this.props;
    this.props.getUser(history);
    setTimeout( () => {
      this.setState({ anime: true});
    }, 20)
  }

  onDrop(files){
    this.setState({files: []},() => {
      if(files[0]){
        this.setState({files})
      }else{
        this.setState({tooLarge: true})
      }
    })
  }

  createListing(){
    var sendF = this.state.files[0];

    if(this.state.files[0]){
      var type = this.state.files[0].type.substring(6);
    }

    var text = "";  
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    const { name, description, price, city, stateUSA, cat} = this.props;
    
    for (var i = 0; i < 10; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length)
      )
    };

    this.setState({imageKey: text},
    () => axios.post('/createlisting', { name, description, price, city, stateUSA, cat, text}).then(
        res => this.props.history.push('/profile')
    )
    );

    if(this.state.files[0]){
      upload.post(`/upload?key=${text}&type=${type}`)
        .attach('theseNamesMustMatch', sendF )
        .end((err, res) => {
          if (err) console.log(err);
          alert('File uploaded!');
        } 
      )
    }
  }

  render() {

    var preview = []
   
    if(this.state.files[0]){
      preview.push(this.state.files[0].preview)
    }

    return (
      <div className="compBody">

        <div className='titlecon'>
          <h1 id='mylistings3' className={this.state.anime ? 'searchTitle2 st22' : 'searchTitle2'}>Step 3</h1>
        </div>

        <div className='step3Body' id=''>

          <div className='imgContainer'>
          <img className="imgPreview" src={preview} alt='preview'/>
          </div>

          <div className='step3BC'>

            <Dropzone className="loginButton" onDrop={this.onDrop = this.onDrop.bind(this)} multiple={false} maxSize={ 1000000 }>
                  <div>upload photo</div>
            </Dropzone>

            <button className='fileb64' onClick={() => this.createListing() }><h2>Create Listing</h2></button>

          </div>

        </div>

        <div className='titlecon'>
        <Link to='/wiz2' style={{textDecoration: 'none', color: 'rgb(124, 211, 177)'}}><h1>back</h1></Link>
        </div>

        { this.state.tooLarge ? <div>{<div className='deleteConfirm'>
          <h3>too large. Only images 1mb or smaller will upload. Sorry!</h3>
          <button onClick={ () => this.setState({tooLarge: false})}>ok :(</button>
        </div>}</div> : <div/> }

      </div>
    );
  }
}

export default connect(state => state, {getUser})(Wiz3);