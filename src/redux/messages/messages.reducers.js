import messageActionTypes from "./messages.types";

const INITIAL_STATE = {
  isAddingMessage: false,
  isUploadFormOpen: false,
  isUploadingMedia: false
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

    case messageActionTypes.OPEN_UPLOAD_MEDIA_FORM:
      return {
        ...state,
        isUploadFormOpen: true
      };
    case messageActionTypes.CLOSE_UPLOAD_MEDIA_FORM:
      return {
        ...state,
        isUploadFormOpen: false
      };

    case messageActionTypes.UPLOAD_MEDIA_START:
      return {
        ...state,
        isUploadingMedia: true
      };
    case messageActionTypes.UPLOAD_MEDIA_SUCCESS:
      return {
        ...state,
        isUploadingMedia: true
      };

    case messageActionTypes.UPLOAD_MEDIA_FAILURE:
      return {
        ...state,
        isUploadingMedia: true
      };

    default:
      return state;
  }
};

export default messagesReducer;
