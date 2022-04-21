//Returns actions and readies them for redux reducer aka holding them to send to other componenets

//Reducer function accepst state and action. Based on the action like create, then we do some logic. We will want to return the action or the state changed by the action 

//Export this reducer to index.js 

import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes'
export default (posts = [], action) => {
    
        switch (action.type) {
            case FETCH_ALL:
                return action.payload;
            case CREATE:
                return [ ...posts, action.payload];
            case UPDATE: 
            //case LIKE: 
                return posts.map((post) => post._id == action.payload._id ? action.payload : post);
            
            case DELETE:
                return posts.filter((post) => post._id !== action.payload);
            default:
                return posts;
        }
    }
