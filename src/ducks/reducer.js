import axios from 'axios';


const initialState = {
    user: []
}

const GET_USER = 'GET_USER'

export default function reducer(state = initialState, action){
        let { payload } = action;
    switch( action.type ){

        case GET_USER + '_FULFILLED':
        return Object.assign( {}, state, {user: payload})

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