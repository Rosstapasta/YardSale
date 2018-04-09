import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './comps.css';

class Search extends Component {

  constructor(props){
    super(props)

    this.state ={
      posts: [],
      city: '',
      state: '',

      refine: false
    }
    this.getAll = this.getAll.bind(this);
  }

  getAll(){
    axios.get('/alllistings').then( res => this.setState({posts: res.data}))
  }

  getCat(){
    const { cat } = this.props.match.params;
    axios.get('/allfromcat', { cat } ).then( res => this.setState({posts: res.data}))
  }

  componentWillMount(){
    window.scrollTo(0, 0);

    if(!this.props.match.params === 'none'){
      this.getCat();
    }else{
      this.getAll();
    }
  }



  render() {
    
    return (
      <div className="compBody">
        
        <h2 className='searchTitle'> Category: {this.props.match.params.cat}</h2>
        <button className='lstButton' onClick={() => this.setState({refine: true})}>Refine Search</button>

        { this.state.refine ? <div>{
          <div className="deleteConfirm">
            <div>
              <h3>City</h3>
              <input/>
            </div>
            <div>
              <h3>State</h3>
              <input/>
            </div>
            <div>
              <h3>Price</h3>
              <input/>
            </div>

            <div style={{ marginTop: '20px'  }}className='rowDisp'>
              <button className='lstButton' >Search</button>
              <button className='lstButton' onClick={ () => this.setState({ refine: false })}>cancel</button>
            </div>
          </div>
        }</div> : 
          <div/>
        }
        
       
      </div>
    );
  }
}

export default Search;