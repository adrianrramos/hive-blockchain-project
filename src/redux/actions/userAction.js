import {
  SET_POST_FORM,
  LOADING_UI,
  SET_ERRORS,
  CLEAR_ERRORS,
  EMAIL_SUCCESS,
  SET_USER_PASSWORD,
  USERNAME_SUCCESS,
} from "../types";
import axios from "axios";
import { uuid } from "uuidv4";
import hive from "@hiveio/hive-js";

export const submitPostForm = formData => dispatch => {
  dispatch({ type: SET_POST_FORM, payload: formData });
};

// REGISTER A USER'S EMAIL AND SEND THEM AN API KEY
export const registerEmail = newUserEmail => dispatch => {
  dispatch({ type: LOADING_UI });

  axios
    .get("https://content.fbslo.net/api/check_creator_tokens")
    .then(function (response) {
      // console.log(response.data.data);
      if (response.data.data.amount > 0) {
        dispatch(requestAccountApiKey(newUserEmail));
      } else {
        window.open("https://hiveonboard.com?ref=fbslo", "_blank");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

const requestAccountApiKey = userEmail => dispatch => {
  const params = new URLSearchParams();
  params.append("email", userEmail);
  axios
    .post("https://content.fbslo.net/api/account_creation_api_key", params)
    .then(response => {
      if (response.data.success) {
        dispatch({ type: EMAIL_SUCCESS });
        dispatch({ type: CLEAR_ERRORS });
      } else {
        dispatch({ type: SET_ERRORS, payload: response.data.message });
      }
    })
    .catch(error => {
      console.log(error);
    });
};

// CONFIRM THE API KEY AND REGISTER THE NEW USER
export const registerUsername = (newUsername, apiKey) => dispatch => {
  console.log(newUsername, apiKey);
  const validUsername = hive.utils.validateAccountName(
    newUsername.toLowerCase()
  );
  if (validUsername !== null) {
    dispatch({
      type: SET_ERRORS,
      payload: `${validUsername}`,
    });
  } else {
    hive.api.getAccounts([newUsername], function (err, result) {
      if (result.length === 0) {
        dispatch({ type: USERNAME_SUCCESS });
        const password = uuid().replace(/-/g, "");
        dispatch({ type: SET_USER_PASSWORD, payload: password });
        dispatch(createAccount(apiKey, newUsername, password));
      } else {
        dispatch({ type: SET_ERRORS, payload: "Username is already taken" });
      }
    });
  }
};

const createAccount = (apiKey, username, password) => dispatch => {
  const params = new URLSearchParams();
  params.append("key", password);
  params.append("api_key", apiKey);
  params.append("name", username);
  axios
    .post("https://content.fbslo.net/api/create_hive_account", params)
    .then(response => {
      console.log(response.data);
      // TODO: if success === true, display success message, name and private key (again, in case if user didn't save it yet)
    })
    .catch(error => {
      console.log(error);
    });
};

export const downloadTxtFile = (key, username) => {
  const element = document.createElement("thisisdownloadfile");
  let text = `Your Hive username is: ${username} and your password is ${key}!`;
  const file = new Blob([text], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  element.download = "hive-account.txt";
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
};
