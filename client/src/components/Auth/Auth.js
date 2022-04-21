import React, {useState} from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container,  TextField } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import LockOutLinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input'
import Icon from './icon'
import useStyles from './styles'

import { signin, signup } from '../../actions/auth'

const initialState = { firstName: '', lastname: '', email: '', password: '', confirmPassword: ''}; //creating initial state fields to take in form fields for manual login

const Auth = () => {
   const classes = useStyles();
   const [showPassword, setShowPassword] = useState(false); //initially showPassword is false
   const [isSignup, setIsSignUp] = useState(false);  //initially isSignUp is false
   const [formData, setFormData] = useState(initialState) //initially initialState is set as an object from above.
   const dispatch = useDispatch();
   const navigate = useNavigate();
   
   

   const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

   const handleSubmit = (e) => {  // Takes in (formData) from submit button from the form for manual login taking in state fields. Are the value of inputs in the state?
    e.preventDefault();

    if(isSignup){
        dispatch(signup(formData, navigate)) //navigate is so we can navigate one something happens
    } else {
        dispatch(signin(formData, navigate))
    }

    console.log(formData)
   }

   const handleChange = (e) => {  // (formData) is then set to setFormData and target each target.name the 'name' of  each field at one time instead of having seperate lines there cpuld be infinite fields. 
        setFormData({ ...formData, [e.target.name]: e.target.value})
   }

   const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false)
   }

   const googleSuccess = async (res) => {
        const result = res?.profileObj; //wont get an error if it doesn exist. Will simply say undefined
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: { result, token } });
            navigate('/'); //Refreshes to main screen after successful login
        } catch (error) {
            console.log(error)
        }
        console.log(res);
   }

   const googleFailure = () => {
       console.log("Google Sign in was unsuccessful. Try again later.")
} 

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}> 
                <Avatar className={classes.avatar}>
                    <LockOutLinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign in'}</Typography>
                <form className={classes.form} onSubmit= {handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (  //only if it is sign up show the following:
                                <>
                                
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                           
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                                
                                </>
                            )}
                                    <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                   
                                    {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password "/>}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}> 
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin 
                        clientId="392080499748-obabt0kh8be3ivabd4aa7abfk6g0tpb2.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                              Google Sign In
                            </Button>
                          )} 
                          onSuccess={googleSuccess}
                          onFailure={googleFailure}
                          cookiePolicy="single_host_origin"
                    />
                    
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}> 
                                {isSignup ? 'Already have an account? Sign In' : 'Dont have an account? Sign Up'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
