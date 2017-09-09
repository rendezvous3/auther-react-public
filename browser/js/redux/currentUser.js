import axios from 'axios';
import { browserHistory } from 'react-router-dom';
import { create as createUser } from './users';

// CONSTANTS

const SET = 'SET_CURRENT_USER';
const REMOVE = 'REMOVE_CURRENT_USER';

// ACTIONS CREATORS

const set = user => ({ type: SET,  user });
const remove = () => ({ type: REMOVE });

// THUNKED ACTION CREATORS

const resToData = res => res.data
const logErr = console.error.bind(console);
const navToUserPage = user => browserHistory.push(`/users/${user.id}`);

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
        .then(navToUserPage)
        .catch(logErr) 

// REDUCER

export default function reducer(currentUser = null, action) {
    switch(action.type) {
        case SET:
            return action.user;
        case REMOVE:
            return null;            
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

const logout = () =>
    dispatch =>
        axios.delete('/api/auth/me')
        .then(() => dispatch(remove()))
        //.catch(logErr);

export const logoutAndGoHome = () => 
    dispatch =>
        dispatch(logout())
        .then(() => browserHistory.push('/'))
        .catch(logErr)


export const signup = credentials => 
    dispatch => 
        axios.post('/api/auth/me', credentials)
        .then(resToData)
        .then(user => {
            dispatch(createUser(user));
            dispatch(set(user));
            return user;
        })

export const signupAndGoToUser = credentials => 
    dispatch =>
        dispatch(signup(credentials))
        .then(navToUserPage)
        .catch(err => console.error("Problem signing in:", err))                          