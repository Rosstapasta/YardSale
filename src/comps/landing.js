import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slider from "react-slick-16";
import './comps.css';


class Landing extends Component {
  constructor(){
    super()

    this.state = {
      listings: [],
    }
  }

  componentWillMount(){

    window.scrollTo(0, 0);
    axios.get('/landing').then( res => {
      this.setState({ listings: res.data })
    })
  }

  render() {

    var settings = {
      dots: true,
      infinite: true,
      speed: 2000,
      slidesToShow: 3,
      slidesToScroll: 3,
      autoplay: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 999,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        }
      ]
    };

    // const { listings } = this.state;

    var listing = this.state.listings.map( (post, i) => {
      return (
        <div key= {i}>
        <div className='listCon'>
          <div id="rd2" className='rowDisp'>
          <h3 className='searchTitle'>#{i+=1}</h3>
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
        </div>
      )
    })

    console.log(listing, 'listing')

    return (
      <div className="compBody">

        <div className='placeholder'/>
        <div className='titlecon'>
        <h1 id='mylistings3' className='searchTitle2'>Featured Items</h1>

        </div>
        
        <div className='mobileDisp'>
        {listing}
        </div>

        <div className='deskDisp'>

        
        <Slider {...settings} className='carousel'>
          {listing}
        </Slider>
        
        </div>

      </div>
    );
  }
}

export default Landing;