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
      anime: false,

      minPrice: 0,
      minPrice2: 0

      // filterS: false,
    }

    this.getAll = this.getAll.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleInputs = this.handleInputs.bind(this);
    this.searchFilter = this.searchFilter.bind(this);
  }

  getAll(){
    const { city2, stateUSA2, price2, minPrice2} = this.state;
    var price22 = price2;
    var price44 = minPrice2;
    if(price22 === 0){
      price22 += 999999999;
    }
    axios.get(`/alllistings?price=${price22}&state=${stateUSA2}&city=${city2}&minprice=${price44}`).then( res => this.setState({posts: res.data, anime: true}))
  }

  getCat(){
    const { cat } = this.props.match.params;
    const { city2, stateUSA2, price2, minPrice2} = this.state;
    var price22 = price2;
    var price44 = minPrice2;
    if(price22 === 0){
      price22 += 999999999;
    }
    console.log(cat, 'cat');

    if(cat === 'none'){
       this.getAll(); 
    }else{
      axios.post(`/allfromcat?price=${price22}&state=${stateUSA2}&city=${city2}&minprice=${price44}`, { cat } ).then( res => this.setState({posts: res.data, anime: true}))
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

    var catDisplay = '';

    if(this.props.match.params.cat === 'none'){
      catDisplay = 'Search'
    }else{ 
      catDisplay = this.props.match.params.cat
    }
    
    
    var posts = this.state.posts;

    var listing = posts.map( (post, i) => {
      return (
        <div id='listCon2' className='listCon' key ={i}>
          <div id="rd2" className='rowDisp'>
          <h3 className="searchTitle">{post.item}</h3>
          <h3 className='searchTitle'>${post.price}</h3>
          </div>

          <img className="searchImg" src={`https://s3-us-west-2.amazonaws.com/yardsaleapp333/${post.img}.jpeg`} alt='img'/>

          <div className='rowDisp'>
          <h3>{post.city}</h3>
          <h3>{`, ${post.stateusa}`}</h3>

          <Link to={`/listing/${post.item_id}`}><button id="searchViewB" className='lstButton'>View</button></Link>
          </div>

        </div>
      )
    })

    return (
      <div className='searchRow'>
        <div className='rD2'>
        <div className='refineDesk'>
          

          <div className=''>
              <h3 className='sparamsText'>City</h3>
              <input value={ this.state.city2 }className='searchInput2' onChange={(e)=> this.handleInputs('city2', e.target.value)}/>
            </div>

            <div className=''>
              <h3 id='' className='sparamsText'>State</h3>
              <select id='' onChange={this.handleChange} value={this.state.stateUSA2} className='searchInput2'>
              <option value=''></option>
              <option value='Alabama'>Alabama</option>
              <option value="Alaska">Alaska</option>
              <option value='Arizona'>Arizona</option>
              <option value="Arkansas">Arkansas</option>
              <option value='California'>California</option>
              <option value="Colorado">Colorado</option>
              <option value='Connecticut'>Connecticut</option>
              <option value="Delaware">Delaware</option>
              <option value='Florida'>Florida</option>
              <option value="Georgia">Georgia</option>
              <option value='Hawaii'>Hawaii</option>
              <option value="Idaho">Idaho</option>
              <option value='Illinois'>Illinois</option>
              <option value="Indiana">Indiana</option>
              <option value='Iowa'>Iowa</option>
              <option value="Kansas">Kansas</option>
              <option value='Kentucky'>Kentucky</option>
              <option value="Louisiana">Louisiana</option>
              <option value='Maine'>Maine</option>
              <option value="Maryland">Maryland</option>
              <option value='Massachusetts'>Massachusetts</option>
              <option value="Michigan">Michigan</option>
              <option value='Minnesota'>Minnesota</option>
              <option value="Mississippi">Mississippi</option>
              <option value='Missouri'>Missouri</option>
              <option value="Montana">Montana</option>
              <option value='Nebraska'>Nebraska</option>
              <option value="Nebraska">Nebraska</option>
              <option value='Nevada'>Nevada</option>
              <option value="New Hampshire">New Hampshire</option>
              <option value='New Jersey'>New Jersey</option>
              <option value="New Mexico">New Mexico</option>

              <option value='New York'>New York</option>
              <option value="North Carolina">North Carolina</option>
              <option value='North Dakota'>North Dakota</option>
              <option value="Ohio">Ohio</option>
              <option value='Oklahoma'>Oklahoma</option>
              <option value="Oregon">Oregon</option>
              <option value='Pennsylvania'>Pennsylvania</option>
              <option value="Rhode Island">Rhode Island</option>
              <option value='South Carolina'>South Carolina</option>
              <option value="South Dakota">South Dakota</option>
              <option value='Tennessee'>Tennessee</option>
              <option value="Texas">Texas</option>
              <option value='Utah'>Utah</option>
              <option value="Vermont">Vermont</option>
              <option value='Virginia'>Virginia</option>

              <option value='Washington'>Washington</option>
              <option value="West Virginia">West Virginia</option>
              <option value='Wisconsin'>Wisconsin</option>
              <option value="Wyoming">Wyoming</option>
              </select>
            </div>

            <div className=''><h3 className='sparamsText'>Max Price</h3><input value={ this.state.price2 }className='searchInput2' onChange={(e) => this.handleInputs('price2', e.target.value)}/>
            </div>

            <div className=''><h3 className='sparamsText'>Min Price</h3><input value={ this.state.minPrice2 }className='searchInput2' onChange={(e) => this.handleInputs('minPrice2', e.target.value)}/>
            </div>

            <button id='search44' className='loginButton' onClick={() => this.searchFilter()}>Search</button>

        </div>
        </div>

      <div id={`${this.props.match.params.cat}`} className="compBody">
        

        <div id='titlecon2' className='sRow'>

        
        <h2 className={ this.state.anime ? 'searchTitle2 st22' : 'searchTitle2'}>{catDisplay}</h2>
        

        <button id='sbb' className='searchButton' onClick={() => this.setState({refine: true})}>Refine Search</button>
        </div>

        { this.state.refine ? <div>{
          <div className="deleteConfirm">

            <div className='rowDisp'>
              <h3 id='searchT2' className='searchT'>City</h3>
              <input value={ this.state.city2 }className='searchInput' onChange={(e)=> this.handleInputs('city2', e.target.value)}/>
            </div>

            <div className='rowDisp'>
              <h3 id='' className='searchT'>State</h3>
              <select id='searchS' onChange={this.handleChange} value={this.state.stateUSA2} className='searchInput'>
                <option value=''></option>
                <option value='Alabama'>Alabama</option>
                <option value="Alaska">Alaska</option>
                <option value='Arizona'>Arizona</option>
                <option value="Arkansas">Arkansas</option>
                <option value='California'>California</option>
                <option value="Colorado">Colorado</option>
                <option value='Connecticut'>Connecticut</option>
                <option value="Delaware">Delaware</option>
                <option value='Florida'>Florida</option>
                <option value="Georgia">Georgia</option>
                <option value='Hawaii'>Hawaii</option>
                <option value="Idaho">Idaho</option>
                <option value='Illinois'>Illinois</option>
                <option value="Indiana">Indiana</option>
                <option value='Iowa'>Iowa</option>
                <option value="Kansas">Kansas</option>
                <option value='Kentucky'>Kentucky</option>
                <option value="Louisiana">Louisiana</option>
                <option value='Maine'>Maine</option>
                <option value="Maryland">Maryland</option>
                <option value='Massachusetts'>Massachusetts</option>
                <option value="Michigan">Michigan</option>
                <option value='Minnesota'>Minnesota</option>
                <option value="Mississippi">Mississippi</option>
                <option value='Missouri'>Missouri</option>
                <option value="Montana">Montana</option>
                <option value='Nebraska'>Nebraska</option>
                <option value="Nebraska">Nebraska</option>
                <option value='Nevada'>Nevada</option>
                <option value="New Hampshire">New Hampshire</option>
                <option value='New Jersey'>New Jersey</option>
                <option value="New Mexico">New Mexico</option>

                <option value='New York'>New York</option>
                <option value="North Carolina">North Carolina</option>
                <option value='North Dakota'>North Dakota</option>
                <option value="Ohio">Ohio</option>
                <option value='Oklahoma'>Oklahoma</option>
                <option value="Oregon">Oregon</option>
                <option value='Pennsylvania'>Pennsylvania</option>
                <option value="Rhode Island">Rhode Island</option>
                <option value='South Carolina'>South Carolina</option>
                <option value="South Dakota">South Dakota</option>
                <option value='Tennessee'>Tennessee</option>
                <option value="Texas">Texas</option>
                <option value='Utah'>Utah</option>
                <option value="Vermont">Vermont</option>
                <option value='Virginia'>Virginia</option>

                <option value='Washington'>Washington</option>
                <option value="West Virginia">West Virginia</option>
                <option value='Wisconsin'>Wisconsin</option>
                <option value="Wyoming">Wyoming</option>
                
              </select>
            </div>

            <div className='rowDisp'><h3 className='searchT'>Max Price</h3><input value={ this.state.price2 }className='searchInput' onChange={(e) => this.handleInputs('price2', e.target.value)}/>
              </div>

            <div className='rowDisp'><h3 className='searchT'>Min Price</h3><input value={ this.state.minPrice2 }className='searchInput' onChange={(e) => this.handleInputs('minPrice2', e.target.value)}/>
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
      </div>
    );
  }
}

export default Search;