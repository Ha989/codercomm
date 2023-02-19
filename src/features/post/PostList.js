import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from './PostCard';
import {getPosts}  from './postSlice';
import { Typography, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';

function PostList({ userId }) {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { postsById, currentPagePosts, totalPosts, isLoading} = useSelector((state) => state.post) 
  const posts = currentPagePosts.map((postId) => postsById[postId]);

  useEffect(() => {
    if (userId ) 
      dispatch(getPosts({ userId, page }));
    
  }, [userId, page, dispatch])
  
  return (
   <>
     {posts?.map((post) => 
         (
          <PostCard key={post?._id} post={post}/>
         )
        )}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
        { totalPosts ? 
             (<LoadingButton
              variant="outlined"
              size="small"
              loading={isLoading}
              onClick={() => setPage((page) => page + 1)}
              disabled={Boolean(totalPosts) && posts.length >= totalPosts}
             >Load more</LoadingButton>) 
           : (<Typography variant="h6">No post yet</Typography>)}
        </Box>
   </>
     
  
  )
}

export default PostList;