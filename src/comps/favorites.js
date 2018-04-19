import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Favorites extends Component{
    constructor(){
        super()

        this.state = {
            listings: []
        }
    }

    componentWillMount(){
        window.scrollTo(0, 0);
        axios.get('/myfavorites').then( res => {
            this.setState({listings: res.data})
        })
    }

    render(){

    var listing = this.state.listings.map( (post, i) => {
      return (
        <div>
        <div className='listCon' key ={i}>
        
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

        return(
            <div className='compBody'>

                <div id='titlecon2' className='sRow'>
                    <h1 id='mylistings' className='searchTitle2'>My Favorites</h1>
                </div>

                <div id='lf2' className='listingsFlex'>
                    {listing}
                </div>

            </div>
        )
    }
}