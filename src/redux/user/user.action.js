import userActionTypes from "./user.types";
import { auth } from "../../firebase/firebase";

const getUserStart = () => ({
  type: userActionTypes.GET_USER_START
});

const getUserSuccess = user => ({
  type: userActionTypes.GET_USER_SUCCESS,
  payload: user
});

const getUserFailure = error => ({
  type: userActionTypes.GET_USER_FAILURE,
  payload: error.message
});

export const getUserASYNC = history => dispatch => {
  dispatch(getUserStart());
  auth.onAuthStateChanged(
    user => {
      dispatch(getUserSuccess(user));
      if (user) {
        history.push("/");
      } else {
        history.push("/login");
      }
    },
    error => {
      dispatch(getUserFailure(error));
    }
  );
};
