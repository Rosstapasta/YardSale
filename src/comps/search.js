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
      stateUSA: '',
      price: 0,

      city2: '',
      stateUSA2:'',
      price2: 0,

      cat: this.props.match.params.cat,
      refine: false,

      // filterS: false,
    }

    this.getAll = this.getAll.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleInputs = this.handleInputs.bind(this);
    this.searchFilter = this.searchFilter.bind(this);
  }

  getAll(){
    const { city2, stateUSA2, price2} = this.state;
    var price22 = price2;
    if(price22 === 0){
      price22 += 999999999;
    }
    axios.get(`/alllistings?price=${price22}&state=${stateUSA2}&city=${city2}`).then( res => this.setState({posts: res.data}))
  }

  getCat(){
    const { cat } = this.props.match.params;
    const { city2, stateUSA2, price2} = this.state;
    var price22 = price2;
    if(price22 === 0){
      price22 += 999999999;
    }
    console.log(cat, 'cat');

    if(cat === 'none'){
       this.getAll(); 
    }else{
      axios.post(`/allfromcat?price=${price22}&state=${stateUSA2}&city=${city2}`, { cat } ).then( res => this.setState({posts: res.data}))
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

  handleChange(e){
    this.setState({stateUSA2: e.target.value});
  }


  handleInputs(prop, val){
    this.setState({[prop]: val, filterSwitch: true})
  }

  searchFilter(){
    this.setState({price: this.state.price2, city: this.state.city2, stateUSA: this.state.stateUSA2}, this.getCat(), this.setState({refine: false}))
  }

  render() {

    if(this.state.cat !== this.props.match.params.cat){
      this.getCat();
      this.setState({cat: this.props.match.params.cat})
    }
    
    
    var posts = this.state.posts;

    var listing = posts.map( (post, i) => {
      return (
        <div className='listCon' key ={i}>
          <div id="rd2" className='rowDisp'>
          <h3 className="searchTitle">{post.item}</h3>
          <h3 className='searchTitle'>${post.price}</h3>
          </div>

          <img className="searchImg" src={`https://s3-us-west-2.amazonaws.com/yardsaleapp333/${post.img}.jpeg`} />

          <div className='rowDisp'>
          <h3>{post.city}</h3>
          <h3>{`, ${post.stateusa}`}</h3>

          <Link to={`/listing/${post.item_id}`}><button id="searchViewB" className='lstButton'>View</button></Link>
          </div>

        </div>
      )
    })

    return (
      <div id={`${this.props.match.params.cat}`} className="compBody">
        

        <div className='sRow'>
        <h2 className='searchTitle2'>{this.props.match.params.cat}</h2>
        <button id='sbb' className='searchButton' onClick={() => this.setState({refine: true})}>Refine Search</button>
        </div>

        { this.state.refine ? <div>{
          <div className="deleteConfirm">

            <div className='rowDisp'>
              <h3 className='searchT'>City</h3>
              <input value={ this.state.city2 }className='searchInput' onChange={(e)=> this.handleInputs('city2', e.target.value)}/>
            </div>

            <div className='rowDisp'>
              <h3 id='searchST' className='searchT'>State</h3>
              <select id='searchS' onChange={this.handleChange} value={this.state.stateUSA2} className='searchInput'>
                <option value='Utah'>Utah</option>
                <option value="California">California</option>
              </select>
            </div>

            <div className='rowDisp'><h3 className='searchT'>Price</h3><input value={ this.state.price2 }className='searchInput' onChange={(e) => this.handleInputs('price2', e.target.value)}/>
              </div>

            <div style={{ marginTop: '20px'  }}className='rowDisp'>
              <button id='searchB'className='lstButton' onClick={() => this.searchFilter()}>Search</button>
              <button id="searchB" className='lstButton' onClick={ () => this.setState({ refine: false })}>cancel</button>
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