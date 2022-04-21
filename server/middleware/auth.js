import jwt from 'jsonwebtoken';


//MiddleWare: Do this and do something after this is done.
//User wants to like a post
//Clicks the like button => auth middleware (next) => like controller...
// (auth middleware confirms or denies that request, says next, and only then are we going to call like controller )



//'next', do something and move to the next thing

//After user is signed up or signed in, he recieves a token, if user wants to do something like add or delete posts we have to check if token is valid 
const auth = async (req, res, next) => {

    try {
        const token = req.headers.authorization.split(" ")[1];  //Getting token from frontend (Google Auth)
        const isCustomAuth = token.length < 500; //CustomAuth  Less than 500 = custom, greater than 500 = Google Auth  

        let decodedData; //Variable that we want to get from token itself

        if (token && isCustomAuth){   //if we have token and is custom, set decodedData to be equal to jwt.verify, gives usernmae and ID
            decodedData = jwt.verify(token, 'test'); //Pass the token and secret, secret must be same as the original token

            req.userID = decodedData?.id; // Custom Auth: Now that we have that decodedData we know which user is logged in and which user is liking, deleting posts...? for optional chaining
        } else {
            decodedData = jwt.decode(token) //Google Auth

            req.userID = decodedData?.sub; //sub is just an ID that differentiates every other google users
        }

        next();


    } catch (error) {
        console.log(error);
    }

}

export default auth;