import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes'
import * as api from '../api'

// --Functions that interact to backend-- \\
// --Dispatching functions to backend as a dispatch not a 'return -- \\


//import api

//Action Creators - functions that return an action.
//Action - is an object that returns the type and the payload. 
//Action logic
//async dispatch, because you have to wait for a response
//This is an action, this gets dispatched


export const getPosts = () => async (dispatch) => {

    try {
        const { data } = await api.fetchPosts();

        dispatch ({ type: FETCH_ALL, payload: data }); //'type' is the reducer

    } catch (error) {
        console.log(error.message)
    }
}

//Takes in post from dispatch(createPost(postData)); in Form.js
export const createPost = (post) => async (dispatch) => {

    try {
        const { data } = await api.createPost(post);

        dispatch({ type: CREATE,  payload: data}) //'type' is the reducer
    } catch (error) {
        console.log(error);
    }

}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);

        dispatch({type: UPDATE, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({type: DELETE, payload: id});
    } catch (error) {
        console.log(error);
    }
}


export const likePost = (id) => async (dispatch) => {
    try {
      
        const { data } = await api.likePost(id);  

        dispatch({type: UPDATE, payload: data});
        
    } catch (error) {
        console.log(error);
    }
}