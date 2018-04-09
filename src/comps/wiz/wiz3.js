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
      imageKey: ''
    }

    this.createListing = this.createListing.bind(this);
  }

  componentWillMount(){
    window.scrollTo(0, 0);
    const { history } = this.props;
    this.props.getUser(history)
  }

  onDrop(files){
    this.setState({files})
  }

  createListing(){
    var sendF = this.state.files[0];
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

    upload.post(`/upload?key=${text}`)
      .attach('theseNamesMustMatch', sendF )
      .end((err, res) => {
        if (err) console.log(err);
        alert('File uploaded!');
      } 
    )
  }


  render() {

    console.log(this.state.files, "files off state")
    var preview = []
   
    if(this.state.files[0]){
      preview.push(this.state.files[0].preview)
    }

    return (
      <div className="compBody">

        <div className="inputs">
        <Link style={{textDecoration: 'none', color: 'black'}} to='/wiz1'><h2 className='ball'>1</h2></Link>
        <div className="placeholder"/>
        <Link style={{textDecoration: 'none', color: 'black'}} to='/wiz2'><h2 className='ball'>2</h2></Link>
        <div className="placeholder"/>
        <h2 id='ball2' className='ball'>3</h2>

        </div>

        <div className='imgContainer'>
        <img className="imgPreview" src={preview} alt='preview'/>
        </div>

        <Dropzone className="loginButton"onDrop={this.onDrop = this.onDrop.bind(this)} multiple={false}>
              <div>upload photo</div>
        </Dropzone>

        <button className='fileb64' onClick={() => this.createListing() }><h2>Create Listing</h2></button>

        <Link to='/wiz2' style={{textDecoration: 'none', color: '#7C95EC'}}><h1>back</h1></Link>

      </div>
    );
  }
}

export default connect(state => state, {getUser})(Wiz3);