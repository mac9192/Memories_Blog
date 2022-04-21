import express from 'express';
import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js'

import auth from '../middleware/auth.js'; //import middleware
const router = express.Router();

//The routes
//localhost:5000/posts
router.get('/', getPosts); //when we go to '/' we call 'getPosts' controller
router.post('/', auth, createPost); 
router.patch('/:id', auth, updatePost);     //add auth before specific action    -- Only updating post you created
router.delete('/:id', auth, deletePost);    //add auth before specific action    -- Only deleting post you created
router.patch('/:id/likePost', auth, likePost)   //add auth before specific action, though everyone has permissions to like you can only like once.


export default router; 