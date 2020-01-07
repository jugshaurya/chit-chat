import userActionTypes from "./user.types";

const INITIAL_STATE = {
  user: null,
  isFetchingUser: false,
  userFetchingError: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.GET_USER_START:
      return {
        ...state,
        user: null,
        isFetchingUser: true,
        userFetchingError: null
      };

    case userActionTypes.GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isFetchingUser: false,
        userFetchingError: null
      };
    case userActionTypes.GET_USER_FAILURE:
      return {
        ...state,
        user: null,
        isFetchingUser: false,
        userFetchingError: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
