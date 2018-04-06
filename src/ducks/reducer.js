import axios from 'axios';


const initialState = {
    user: [],
    name: '',
    description: '',
    price: '',
    city: '',
    stateUSA: '',
    cat: ''
}

const GET_USER = 'GET_USER';
const UPDATE_NAME = 'UPDATE_NAME';
const UPDATE_DES = 'UPDATE_DES';
const UPDATE_PRICE = 'UPDATE_PRICE';
const UPDATE_CITY = 'UPDATE_CITY';
const UPDATE_STATE = 'UPDATE_STATE';
const UPDATE_CAT = 'UPDATE_CAT';

export default function reducer(state = initialState, action){
        let { payload } = action;
    switch( action.type ){

        case GET_USER + '_FULFILLED':
        return Object.assign( {}, state, {user: payload})

        case UPDATE_NAME:
        return Object.assign( {}, state, {name: payload})

        case UPDATE_DES:
        return Object.assign( {}, state, {description: payload})

        case UPDATE_PRICE:
        return Object.assign( {}, state, { price: payload})

        case UPDATE_CITY:
        return Object.assign( {}, state, {city: payload})

        case UPDATE_STATE:
        return Object.assign( {}, state, {stateUSA: payload})

        case UPDATE_CAT:
        return Object.assign( {}, state, {cat: payload})

        default: return state;
    }

}

export function getUser(history){
    return {
        type: GET_USER,
        payload: axios.get('/checkauth2').then( res => {
            console.log(res.data, 'res.data from redux')
            if(res.data[0].id === 0){
                history.push('/')
            }else{
                return res.data
            }
        })
    }
}

export function updateName(val){
    return {
        type: UPDATE_NAME,
        payload: val
    }
}

export function updateDes(val){
    return {
        type: UPDATE_DES,
        payload: val
    }
}

export function updatePrice(val){
    return {
        type: UPDATE_PRICE,
        payload: val
    }
}

export function updateCity(val){
    return {
        type: UPDATE_CITY,
        payload: val
    }
}

export function updateState(val){
    return {
        type: UPDATE_STATE,
        payload: val
    }
}

export function updateCat(val){
    return {
        type: UPDATE_CAT,
        payload: val
    }
}