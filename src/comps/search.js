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

      cat: this.props.match.params.cat,

      refine: false
    }
    this.getAll = this.getAll.bind(this);
  }

  getAll(){
    axios.get('/alllistings').then( res => this.setState({posts: res.data}))
  }

  getCat(){
    const { cat } = this.props.match.params;
    console.log(cat, 'cat');

    if(cat === 'none'){
       this.getAll(); 
    }else{
      axios.post('/allfromcat', { cat } ).then( res => this.setState({posts: res.data}))
    }
  }

  componentWillMount(){
    const { cat } = this.props.match.params;
    window.scrollTo(0, 0);

    if(cat !== 'none'){
      this.getCat();
    }else{
      this.getAll();
    }
    
  }



  render() {
    console.log(this.state.posts, this.state.cat, "posts from state")

    if(this.state.cat !== this.props.match.params.cat){
      this.getCat();
      this.setState({cat: this.props.match.params.cat})
    }


    var listing = this.state.posts.map( (post, i) => {
      return (
        <div className='listCon' key ={i}>

        </div>
      )
    })

    return (
      <div className="compBody">
        
        <h2 className='searchTitle'> Category: {this.props.match.params.cat}</h2>
        <button className='lstButton' onClick={() => this.setState({refine: true})}>Refine Search</button>

        { this.state.refine ? <div>{
          <div id='refineSearch' className="deleteConfirm">
            <div><h3>City</h3><input className='searchInput'/>
              </div>
            <div><h3>State</h3><input className='searchInput'/>
              </div>
            <div><h3>Price</h3><input className='searchInput'/>
              </div>
            <div style={{ marginTop: '20px'  }}className='rowDisp'>
              <button className='lstButton' >Search</button>
              <button className='lstButton' onClick={ () => this.setState({ refine: false })}>cancel</button>
            </div>
          </div>
          }</div> : 
          <div/>
        }

        {listing}

        <div></div>
        
       
      </div>
    );
  }
}

export default Search;