import { SET_POSTS, LOADING_DATA, SET_FILTER } from "../types";

const initialState = {
  posts: [], // FIXME: set posts reducer
  loading: false,
  filter: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_POSTS: // FIXME: set posts reducer
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
}
