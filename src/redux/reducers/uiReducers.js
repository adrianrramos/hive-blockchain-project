import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
  EMAIL_SUCCESS,
  USERNAME_SUCCESS,
} from "../types";

const initialState = {
  loading: false,
  errors: null,
  emailSuccess: false,
  usernameSuccess: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null,
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false,
      };
    case EMAIL_SUCCESS:
      return {
        ...state,
        emailSuccess: true,
      };
    case USERNAME_SUCCESS:
      return {
        ...state,
        usernameSuccess: true,
      };
    default:
      return state;
  }
}
