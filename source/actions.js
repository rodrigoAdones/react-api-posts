import api from './api';

function setPost(post) {
  return {
    type: 'SET_POST',
    payload: post,
  };
}

function setComments(comments) {
  return {
    type: 'SET_COMMENTS',
    payload: comments,
  };
}

function setUser(user) {
  return {
    type: 'SET_USER',
    payload: user,
  };
}

function postNextPage() {
  return async (dispatch, getState) => {
    const state = getState();
    const currentPage = state.posts.page;

    const posts = await api.posts.getList(currentPage);

    dispatch(
      setPost(posts),
    );
  };
}

function loadUser(userId) {
  return async (dispatch) => {
    const user = await api.users.getSingle(userId);

    dispatch(
      setUser(user),
    );
  };
}

function loadCommentsForPost(postId) {
  return async (dispatch) => {
    const comments = await api.posts.getComments(postId);

    dispatch(
      setComments(comments),
    );
  };
}

export default {
  postNextPage,
  loadCommentsForPost,
  loadUser,

  setPost,
  setComments,
  setUser,
};
