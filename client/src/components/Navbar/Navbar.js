import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import memories from '../../images/memories.png'

import useStyles from './styles';

const Navbar = () => {

    const classes= useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));  //Getting user info into navbar from local storage => Google Auth saved in auth reducers
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT'});
        navigate('/');

        setUser(null)
    };

    useEffect(() => {
        const token = user?.token; //if token exists, 
        
        
      if(token) {
        const decodedToken = decode(token);

        if(decodedToken.exp * 1000 < new Date().getTime()) logout()
      }

        setUser(JSON.parse(localStorage.getItem('profile'))) //set user to the token
        }, [location] ); //when location changes, simply set the user.

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
          <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography>
          <img className={classes.image} src={memories} alt="icon" height="60" />
        </div>
        <Toolbar className={classes.toolbar}>
          {user?.result ? (
            <div className={classes.profile}>
              <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
              <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
              <Button variant="contained" className={classes.logout} color="secondary" onClick={logout} >Logout</Button>
            </div>
          ) : (
            <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
          )}
        </Toolbar>
      </AppBar>
    )
}

export default Navbar
