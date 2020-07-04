import { SET_POST_FORM, LOADING_UI, SET_USER_PASSWORD } from "../types";

const initialState = {
  loading: false,
  authenticated: false,
  post_form_data: [],
  blog_form: {},
  userPassword: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_POST_FORM:
      return {
        ...state,
        post_form_data: action.payload,
      };
    case SET_USER_PASSWORD:
      return {
        ...state,
        userPassword: action.payload,
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
