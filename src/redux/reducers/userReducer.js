import { SET_POST_FORM } from "../types";

const initialState = {
  blog_form: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_POST_FORM:
      return {
        ...state,
        blog_form: action.payload,
      };
    default:
      return state;
  }
}
