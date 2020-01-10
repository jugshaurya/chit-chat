import messagesActionTypes from "./messages.types";
import { database } from "../../firebase/firebase";

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
  try {
    await newMessageRef.set({
      message,
      createdBy: {
        userId: user.uid
      },
      createdAt: new Date()
    });
    dispatch(addMessageASYNCSuccess());
  } catch (err) {
    console.error(err);
    dispatch(addMessageASYNCFailure());
  }
};
