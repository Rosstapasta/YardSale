import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../ducks/reducer';
// import axios from 'axios';
// import FileBase64 from 'react-file-base64';
import Dropzone from 'react-dropzone';
import upload from 'superagent';


class AddListing extends Component {
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
    
    for (var i = 0; i < 5; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length)
      )
    };

    this.setState({imageKey: text});

    upload.post(`/upload?key=${text}`)
      .attach('theseNamesMustMatch', sendF )
      .end((err, res) => {
        if (err) console.log(err);
        alert('File uploaded!');
      } 
    )
  }

  render() {

    var preview = []
    // var preview2 = []
    if(this.state.files[0]){
      preview.push(this.state.files[0].preview)
    }

    return (
      <div className="compBody">

        <h1>Step 1</h1>

        <div className='imgContainer'>
        <img className="imgPreview" src={preview} alt='preview'/>
        </div>

        <Dropzone className="loginButton"onDrop={this.onDrop = this.onDrop.bind(this)} multiple={false}>
              <div>upload photo</div>
        </Dropzone>

        <button className='fileb64' onClick={() => this.createListing() }><h2>Create Listing</h2></button>

      </div>
    );
  }
}
export default connect(state => state, {getUser})(AddListing);