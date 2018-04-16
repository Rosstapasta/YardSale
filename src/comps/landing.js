import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import right from './media/right.png';
import left from './media/left.png';

class Landing extends Component {
  constructor(){
    super()

    this.state = {
      listings: [],
      page: 0,
      pageEnd: 3
    }
    this.forward3 = this.forward3.bind(this);
    this.back3 = this.back3.bind(this);
  }

  componentWillMount(){
    window.scrollTo(0, 0);

    axios.get('/landing').then( res => {
      this.setState({ listings: res.data })
    })
  }


  forward3(){
    if(this.state.page+3 < this.state.listings.length){
      this.setState({page: this.state.page+=3, pageEnd: this.state.pageEnd+=3})
    }
  }

  back3(){
    if(this.state.page > 0){
      this.setState({page: this.state.page-=3, pageEnd: this.state.pageEnd-=3})
    }
  }

  render() {
    console.log(this.state.listings)

    const { listings, page, pageEnd } = this.state;
    var newListings = listings.slice(page, pageEnd);


    var listing2 = newListings.map( (post, i) => {
      return (
        <div id="listCon2" className='listCon' key ={i}>
          <div id="rd2" className='rowDisp'>
          <h3 className='searchTitle'>#{i+1+this.state.page}</h3>
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

    var listing = this.state.listings.map( (post, i) => {
      return (
        <div className='listCon' key ={i}>
          <div id="rd2" className='rowDisp'>
          <h3 className='searchTitle'>#{i+=1}</h3>
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
      <div className="compBody">

        {/* <div className='landho'>
        <h2 className='x'>X</h2>
        <h2 className='landingText'>Thank you for using Yard Sale! Below you will find the most popular listings. </h2>
        </div> */}

        <h1 id='mylistings' className='searchTitle2'>Featured Items</h1>
        
        <div className='mobileDisp'>
        {listing}
        </div>

        <div className='deskDisp'>
        <img onClick={ () => this.back3()} className='lrArrows'src={ left } alt='right'/>
          {listing2}
          <img onClick={() => this.forward3()} className='lrArrows'src={ right } alt='right'/>
        </div>
       
      </div>
    );
  }
}

export default Landing;