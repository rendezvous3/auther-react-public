import axios from 'axios';

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
        .then(user => dispatch(set(user)))
        .catch(logErr)

// REDUCER

export default function reducer(currentUser = {}, action) {
    switch(action.type) {
        case SET:
            return action.user;
        default:
            return currentUser;
    }
}