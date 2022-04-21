import { combineReducers } from 'redux';

import posts from './posts';  //import reducers from posts
import auth from './auth';

export default combineReducers({ posts, auth }); //add all the reducers. In this we only have post