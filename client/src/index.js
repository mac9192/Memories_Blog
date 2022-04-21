import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux' //This allows access of state throughout the app any component. 
import { createStore, applyMiddleware, compose } from 'redux' //Redux setup
import thunk from 'redux-thunk'

//import reducers
import reducers from './reducers';

import App from './App';
import './index.css'


//Setting up Redux
const store = createStore(reducers, compose(applyMiddleware(thunk)));


ReactDOM.render(
    //Wrap the app with the provider allowing redux/reducer action on a global scale 
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root')
);