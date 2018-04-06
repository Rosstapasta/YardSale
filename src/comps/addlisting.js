import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../ducks/reducer';
import axios from 'axios';
import FileBase64 from 'react-file-base64';



class AddListing extends Component {
  constructor(){
    super()

    this.state = {
      files: [],
      returnedF: []
    }
    this.sendPics = this.sendPics.bind(this);
  }

  componentWillMount(){
    const { history } = this.props;
    this.props.getUser(history)
  }


  sendPics(){
    console.log("hit sendPics method")
    var picsArr = this.state.files;

    axios.post('/sendpics', {picsArr}).then( res => this.setState({returnedF: res.data}))
  }

  getFiles(files){
    var newData = this.state.files;
    newData.push(files[0].base64)
    this.setState({ files: newData })
  }

  render() {

    console.log(this.state.returnedF, "files off state")
    var preview = []
    var preview2 = []
    if(this.state.files[0]){
      preview.push(this.state.files[0])
    }

    if(this.state.returnedF[0]){
      preview2.push(this.state.returnedF[0].images)
    }


    return (
      <div className="compBody">

        <h1>Step 1</h1>

        <img className="imgPreview" src={preview} alt="img"/>

        <button className="loginButton" onClick={() => this.sendPics()}>sendpics</button>

        <div className="fileb64">
          <FileBase64
          multiple={ true }
          onDone={ this.getFiles.bind(this) } />
        </div>

        <img className="imgPreview" src={preview2} alt="img"/>
   
      </div>
    );
  }
}

export default connect(state => state, {getUser})(AddListing);