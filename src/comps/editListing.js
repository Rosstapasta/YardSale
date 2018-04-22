import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Edit extends Component{

    constructor(){
        super()

        this.state ={
            image: '',
            item: '',
            price: 0,
            city: '',
            stateUSA: '',
            anime: false
        }
        this.updatelisting = this.updatelisting.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount(){
        window.scrollTo(0, 0);
        const { listId } = this.props.match.params;
        axios.post('/editlisting', {listId} ).then(
            res => this.setState({item: res.data[0].item, price: res.data[0].price, city: res.data[0].city, stateUSA: res.data[0].stateusa, image: res.data[0].img, anime: true})
        )
    }

    handleChange(prop, val){
        this.setState({[prop]: val})
    }

    updatelisting(){
        const { listId } = this.props.match.params;
        const { item, price, city, stateUSA} = this.state;
        axios.put('/updatelisting', { item, price, city, stateUSA, listId } ).then( res => {
            this.setState({ item: res.data[0].item, price: res.data[0].price, city: res.data[0].city, stateUSA: res.data[0].stateusa, image: res.data[0].img })
        })
    }
    
  render(){
    return(
        <div className="compBody">

            <div className='titlecon'>
                <h1 id='mylistings3' className={ this.state.anime ? 'searchTitle2 st22' : 'searchTitle2'}>Edit Listing</h1>
            </div>

            <div className='editmobile'>
                <h2 className="editText">Item</h2>
                <input className='editInput' value={this.state.item} onChange={(e) => this.handleChange('item', e.target.value)}/>

                <div id='pol2' className='imgwithimg'>

                <img className='editImg' src={`https://s3-us-west-2.amazonaws.com/yardsaleapp333/${this.state.image}.jpeg`} alt='img'/>
                </div>

                <h2 className='editText'>Price</h2>
                <input className='editInput' value={this.state.price} onChange={(e) => this.handleChange('price', e.target.value)}/>

                <h2 className='editText'>City</h2>
                <input className='editInput' value={this.state.city} onChange={(e) => this.handleChange('city', e.target.value)}/>

                <h2 className='editText'>State</h2>
                <input className='editInput' value={this.state.stateUSA} onChange={(e) => this.handleChange('stateUSA', e.target.value)}/>

                <div className='placeholder'/>
                <div className='rowDisp'>
                    <Link to='/mylistings'><button className='lstButton'>Cancel</button></Link>
                    <button className='lstButton' onClick={() => this.updatelisting()}>Update</button>
                </div>
                <div className='placeholder'/>
            </div>

            <div className='editDesktop'>

                <div id='editC' className='editDesktop'>

                    <h2 className="editText">Item</h2>
                        <input className='editInput' value={this.state.item} onChange={(e) => this.handleChange('item', e.target.value)}/>

                        <h2 className='editText'>Price</h2>
                        <input className='editInput' value={this.state.price} onChange={(e) => this.handleChange('price', e.target.value)}/>

                        <h2 className='editText'>City</h2>
                        <input className='editInput' value={this.state.city} onChange={(e) => this.handleChange('city', e.target.value)}/>

                        <h2 className='editText'>State</h2>
                        <input className='editInput' value={this.state.stateUSA} onChange={(e) => this.handleChange('stateUSA', e.target.value)}/>

                        <div className='placeholder'/>
                        <div className='rowDisp'>
                            <Link to='/mylistings'><button className='lstButton'>Cancel</button></Link>
                            <button className='lstButton' onClick={() => this.updatelisting()}>Update</button>
                        </div>
                        <div className='placeholder'/>


                </div>

                    <div id='pol3' className='imgwithimg'>
                    <img id='editImg3' className='editImg' src={`https://s3-us-west-2.amazonaws.com/yardsaleapp333/${this.state.image}.jpeg`} alt='img'/>
                    </div>

            </div>

        </div>
    )
  }
}