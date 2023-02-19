import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { POSTS_PER_PAGE } from "../../app/config";
import { cloudinaryUpload } from "../../utils/cloudinary";
import { toast } from 'react-toastify';
import { getCurrentUserProfile } from "../user/userSlice";


const initialState = {
    isLoading: false,
    error: null,
    postsById: {},
    currentPagePosts: [],
}

const slice = createSlice({
    name: "post",
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
          },
        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
          },
        createPostSuccess(state, action) {
            state.isLoading = false;
            state.error = null;
            const newPost = action.payload;
            if (state.currentPagePosts.length % POSTS_PER_PAGE === 0)
            state.currentPagePosts.pop();
            state.postsById[newPost._id] = newPost;
            state.currentPagePosts.unshift(newPost._id);
        },
        getPostSuccess(state, action) {
          state.isLoading = false;
          state.error = null;
          const { count, posts } = action.payload;
          posts.forEach((post) => {
            state.postsById[post._id] = post;
            if (!state.currentPagePosts.includes(post._id))
            state.currentPagePosts.push(post._id);
        });
          state.totalPosts = count;
        },
        sendPostReactionSuccess(state, action) {
          state.isLoading = false;
          state.error = null;
          const { postId, reactions } = action.payload;
          state.postsById[postId].reactions = reactions;
        },
        resetPost( state, action) {
          state.postsById = {};
          state.currentPagePosts = [];
        },
        deletePostSuccess(state, action) {
          state.isLoading = false;
          state.error = null;
          const { postId } = action.payload;
          delete state.postsById[postId];
          state.currentPagePosts = state.currentPagePosts.filter((postId) => postId !== action.payload.postId);
        },
        editedPostSuccess(state, action) {
          state.isLoading = false;
          state.error = null;
          const editedPostId = action.payload;
          state.postsById[editedPostId._id].content = editedPostId.content;
          state.postsById[editedPostId._id].image = editedPostId.image;
        }
       
    }
});

export const createPost = ({ content, image, }) => 
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        const imageUrl = await cloudinaryUpload(image);
        const response = await apiService.post("/posts", {
            content,
            image: imageUrl,
        });
        dispatch(slice.actions.createPostSuccess(response.data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
    }
  }

  export const getPosts = ({ userId, page, limit = POSTS_PER_PAGE }) => 
    async (dispatch) => {
      dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
        const response = await apiService.get(`/posts/user/${userId}`, {
            params,
        });
        if (page === 1) dispatch(slice.actions.resetPost());
        dispatch(slice.actions.getPostSuccess(response.data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
    }
  }


export const sendPostReaction = ({ postId, emoji }) => 
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post(`/reactions`, {
        targetType: "Post",
        targetId: postId,
        emoji,
      });
      dispatch(
        slice.actions.sendPostReactionSuccess({
          postId,
          reactions: response.data,
        })
      );

    } catch(error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

  export const deletePost = ( postId ) => 
    async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {
        
        const response = await apiService.delete(`/posts/${postId}`);
        dispatch(slice.actions.deletePostSuccess({...response.data, postId}));
        toast.success("Deleted success");
      } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
      }
    }

    export const editPost = ({ content, image, postId}) => 
    async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        const imageUrl = await cloudinaryUpload(image);
        const response = await apiService.put(`/posts/${postId}`, {
            content,
            image: imageUrl,
        });
        dispatch(slice.actions.editedPostSuccess(response.data))
        toast.success("Saved change");
        dispatch(getCurrentUserProfile);
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
    }
  }

export default slice.reducer;