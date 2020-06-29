import { SET_POST_FORM } from "../types";

export const submitPostForm = formData => dispatch => {
  dispatch({ type: SET_POST_FORM, payload: formData });
};
