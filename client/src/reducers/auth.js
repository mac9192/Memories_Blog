import { AUTH, LOGOUT } from '../constants/actionTypes'

const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));  //Store on local storage then we can send it to the navbar component
          
           return { ...state, authData: action?.data};   //return state and authdata => authData from action.data
        
        case LOGOUT:    //When logged out clear local storage and return state and authData as NULL (null is not having a variable, its not meant as zero fyi)
            localStorage.clear()
            return { ...state, authData: null};

        default:
            return state;
    }
}

export default authReducer;   