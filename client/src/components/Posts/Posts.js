import React from 'react'
import { Grid, CircularProgress } from '@material-ui/core'
import { useSelector } from 'react-redux'; //Allows fetching data from global redux store in this component 
import Post from './Post/Post'

import useStyles from './styles';




const Posts = ({ setCurrentId }) => {
    const posts = useSelector((state) => state.posts);  //GAINING ACCESS TO REDUCERS to global state and returning posts from reducers. Also this comes from <Provider> App <Provider /> for global access.
    const classes = useStyles();

    console.log(posts);

    return (
      //maps through For the collection
      //if not post.length , then show loader spinner, else create Grid
      //<Post post={post} /> is sending it as a prop to Post. We can send the individual value of a post the Post component
      //(post) come from state
      !posts.length ? <CircularProgress /> : (
          <Grid className={classes.container} container alignItems="stretch" spacing={3}>
              {posts.map((post) =>(
                <Grid key={post._id} item xs={12} sm={6}> 
                
                    <Post post={post} setCurrentId={setCurrentId}/>  
                </Grid>
              ))}
          </Grid>
      )  
    ); 
}

export default Posts;
