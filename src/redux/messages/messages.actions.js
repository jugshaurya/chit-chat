import messagesActionTypes from "./messages.types";
import firebase, { database } from "../../firebase/firebase";

export const closeUploadMediaForm = () => ({
  type: messagesActionTypes.CLOSE_UPLOAD_MEDIA_FORM
});

export const openUploadMediaForm = () => ({
  type: messagesActionTypes.OPEN_UPLOAD_MEDIA_FORM
});

const addMessageASYNCStart = () => ({
  type: messagesActionTypes.ADD_MESSAGE_START
});

const addMessageASYNCSuccess = () => ({
  type: messagesActionTypes.ADD_MESSAGE_SUCCESS
});

const addMessageASYNCFailure = () => ({
  type: messagesActionTypes.ADD_MESSAGE_FAILURE
});

// ASYNC
export const addMessageASYNC = message => async (dispatch, getState) => {
  dispatch(addMessageASYNCStart());
  const currentChannelId = getState().channels.currentChannel.id;

  const newMessageRef = database.ref(`/messages/${currentChannelId}`).push();
  const user = getState().user.user;
  if (message.type === "image") {
    try {
      await newMessageRef.set({
        image: message.url,
        createdBy: {
          username: user.displayName,
          avatarURL: user.photoURL
        },
        // https://firebase.google.com/docs/reference/js/firebase.database.ServerValue
        createdAt: firebase.database.ServerValue.TIMESTAMP
      });
      dispatch(addMessageASYNCSuccess());
    } catch (err) {
      dispatch(addMessageASYNCFailure());
    }
  } else {
    // type is text

    try {
      await newMessageRef.set({
        message: message.message,
        createdBy: {
          username: user.displayName,
          avatarURL: user.photoURL
        },
        // https://firebase.google.com/docs/reference/js/firebase.database.ServerValue
        createdAt: firebase.database.ServerValue.TIMESTAMP
      });
      dispatch(addMessageASYNCSuccess());
    } catch (err) {
      dispatch(addMessageASYNCFailure());
    }
  }
};
