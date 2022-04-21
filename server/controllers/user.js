import bcrypt from 'bcryptjs' //password hashing
import jwt from 'jsonwebtoken' //safe way to store user in a browser for a period of time, allowing login for a period of time

import User from '../models/user.js'; //import model




export const signin = async (req, res) => {  

    const { email, password } = req.body; //req.body fetches from frontend, so the sign in inputs coming from frontend

    try {
        const existingUser = await User.findOne({ email }); //Looking for existing user in the database

        if(!existingUser) return res.status(404).json({ message: "User doesnt exist. "}); //If no existingUser return (404) 'Does Not Exist'

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password); //If existingUser is true, check if isPassword is correct.

        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentials" }); //If isPasswordCorrect is false return (400)

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" }); //if user exists in DB and password is correct, get JSON web token of data you want to store and that needs to be sent to the frontend
                                                                                             //'test' is supposed to be a secret string that only you know but YT vid dont require it, 
        res.status(200).json({ result: existingUser, token }) //Send response the token with result: existingUser and sends over the token created 
    } catch (error) {                                                                               
        res.status(500).json({ message: 'Something went wrong.' });
    }
}



export const signup = async (req, res) => {

    const { email, password, firstName, confirmPassword, lastName} = req.body; //Fetch signup fields from frontend

    try {
        const existingUser = await User.findOne({ email }); //Looking for existing user in the database

        if(existingUser) return res.status(400).json({ message: "User already exists"}); //If user already exists when signing up, return  "User already exists"

        if(password !== confirmPassword) return res.status(400).json({ message: "Passwords dont match"}); //checks if entered password and repeat password are same.

        const hashedPassword = await bcrypt.hash(password, 12) //hashes password to level 12

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`});

        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" });

        res.status(200).json({ result, token }); //Sends successfully the result and token
    } catch (error) {
        
        res.status(500).json({ message: 'Something went wrong.' }); //If something went wrong
    }
    
}
// If you have a condition and you want to exit early you would use return because calling res.send() more than once will throw an error. For example: