//import from models
/* 2xx Success 
   3xx Redirection
   4xx Client Error
   5xx Server Error
   https://www.restapitutorial.com/httpstatuscodes.html
*/
//The logic that goes to routes


import  mongoose  from 'mongoose';
import PostMessage from '../models/postMessage.js'



//This is exported to index.js as p
export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        console.log(postMessages);

        res.status(200).json(postMessages);  //send response
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

export const createPost = async (req,res) => {
   const post = req.body;  //req.body fetches from frontend, so the post coming from frontend

   const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })
   
   try { 
       await newPostMessage.save();

       res.status(201).json(newPostMessage);
   } catch (error) {
       res.status(409).json ({message: error.message});
       
   }
}

export const updatePost = async (req, res) => {
    const { id:_id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that Id');

    { }
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id}, { new: true} );

    res.json(updatedPost);
} 

export const deletePost = async (req,res) => {
    const { id } =req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that Id');

    await PostMessage.findByIdAndRemove(id);

    console.log('DELETE!');

    res.json ({message: 'Post deleted successfully'});
}

export const likePost = async (req,res) => {
    const { id } =req.params;

    if(!req.userId) return res.json({ message:'Unauthenticated' }); //If the middleware !user.id, user is not authenticated and return 'unauthenticated' 

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that Id'); //Do we have the post the user wants to like

    const post = await PostMessage.findById(id);    //Then we get the actual post 

    const index = post.likes.findIndex((id) => id === String(req.userId)); //See if user ID is already in the like section (only 1 like allowed) (code reads: If ID is equal to String of req.userID, then its already in there, and will be a disklike )

    if(index === -1 ) {
        //if he wants like the post
        post.likes.push(req.userId);
    } else { 
            // dislike a post
            post.likes = post.likes.filter((id) => id !== String(req.userId));
        }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true});

    res.json(updatedPost);
}