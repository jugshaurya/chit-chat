import messageActionTypes from "./messages.types";

const INITIAL_STATE = {
  isAddingMessage: false
};

const messagesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case messageActionTypes.ADD_MESSAGE_START:
      return {
        ...state,
        isAddingMessage: true
      };
    case messageActionTypes.ADD_MESSAGE_SUCCESS:
      return {
        ...state,
        isAddingMessage: false
      };
    case messageActionTypes.ADD_MESSAGE_FAILURE:
      return {
        ...state,
        isAddingMessage: false
      };

    default:
      return state;
  }
};

export default messagesReducer;
