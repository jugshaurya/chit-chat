import messageActionTypes from "./messages.types";

const INITIAL_STATE = {
  messages: [],
  isFetchingMessages: false,
  isAddingMessage: null
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

    case messageActionTypes.GET_ALL_CHANNEL_MESSAGES_START:
      return {
        ...state,
        isFetchingMessages: true
      };

    case messageActionTypes.GET_ALL_CHANNEL_MESSAGES_SUCCESS:
      return {
        ...state,
        isFetchingMessages: false,
        messages: action.payload
      };
    case messageActionTypes.GET_ALL_CHANNEL_MESSAGES_FAILURE:
      return {
        ...state,
        isFetchingMessages: false
      };
    default:
      return state;
  }
};

export default messagesReducer;
