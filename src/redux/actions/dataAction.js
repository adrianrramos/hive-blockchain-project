import { SET_POSTS, LOADING_DATA, SET_FILTER, POST_COMMENT } from "../types";
import axios from "axios";

// GET DATA
export const getTrendingPosts = () => dispatch => {
  dispatch({ type: LOADING_DATA });

  axios
    .get("/api/get_trending_posts")
    .then(res => {
      dispatch({ type: SET_POSTS, payload: res.data.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: SET_POSTS, payload: [] });
    });
};

export const getRecentPosts = () => dispatch => {
  dispatch({ type: LOADING_DATA });

  axios
    .get("/api/get_recent_posts")
    .then(res => {
      dispatch({ type: SET_POSTS, payload: res.data.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: SET_POSTS, payload: [] });
    });
};

export const getMyPosts = userId => dispatch => {
  console.log("attempted to grab my posts with UID: ", userId);
};

// POST DATA
export const submitComment = (
  parentAuthor,
  parentPermLink,
  author,
  permlink,
  title,
  body,
  jsonMetaData
) => dispatch => {
  dispatch({ type: POST_COMMENT, payload: [] });

  // window.hs_helper_comment(
  //   parentAuthor,
  //   parentPermLink,
  //   author,
  //   permlink,
  //   title,
  //   body,
  //   jsonMetaData,
  //   (err, res) => {
  //     console.log(err, res);
  //   }
  // );
  window.hs_helper_get_user_details();
};

export const changeFilter = filter => dispatch => {
  dispatch({ type: SET_FILTER, payload: filter });
};
