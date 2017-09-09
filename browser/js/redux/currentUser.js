import axios from 'axios';
import { browserHistory } from 'react-router-dom';

// CONSTANTS

const SET = 'SET_CURRENT_USER';

// ACTIONS CREATORS

const set = user => ({ type: SET,  user })

// THUNKED ACTION CREATORS

const resToData = res => res.data
const logErr = console.error.bind(console);

export const login = credentials => 
    dispatch =>
        axios.put('/api/auth/me', credentials)
        .then(resToData)
        .then(user =>{
            dispatch(set(user))
            return user;
        }) 
        

export const loginAndGoToUser = credentials =>
    dispatch =>
        dispatch(login(credentials))
        .then(user => browserHistory.push(`/users/${user.id}`))
        .catch(logErr) 

// REDUCER

export default function reducer(currentUser = null, action) {
    switch(action.type) {
        case SET:
            return action.user;
        default:
            return currentUser;
    }
}

export const retrieveLoggedInUser = () =>
    dispatch =>
        axios.get('/api/auth/me')
        .then(resToData)
        .then(user => dispatch(set(user)))
        .catch(logErr)