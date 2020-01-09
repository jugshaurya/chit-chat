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

export const addMessageASYNC = message => async (dispatch, getState) => {
  dispatch(addMessageASYNCStart());
  const newMessageRef = database.ref("/messages").push();
  const user = getState().user.user;
  const currentChannel = getState().channels.currentChannel;
  try {
    await newMessageRef.set({
      message,
      createdBy: {
        userId: user.uid
      },
      channelId: currentChannel.id,
      createdAt: new Date()
    });
    dispatch(addMessageASYNCSuccess());
  } catch (err) {
    console.error(err);
    dispatch(addMessageASYNCFailure());
  }
};

//  get all the messages
const getAllMessagesASYNCStart = () => ({
  type: messagesActionTypes.GET_ALL_CHANNEL_MESSAGES_START
});

const getAllMessagesASYNCSuccess = messages => ({
  type: messagesActionTypes.GET_ALL_CHANNEL_MESSAGES_SUCCESS,
  payload: messages
});

const getAllMessagesASYNCFailure = () => ({
  type: messagesActionTypes.GET_ALL_CHANNEL_MESSAGES_FAILURE
});

export const getAllMessagesASYNC = () => dispatch => {
  dispatch(getAllMessagesASYNCStart());
  // try {
  //   // https://firebase.google.com/docs/database/web/lists-of-data#listen_for_child_events
  //   let messages = [];
  //   // This event is triggered once for each existing child
  //   //  Note: Don't forget to call detatchListeners in componentWIllUnmount
  //   database.ref("/messages").on("child_added", dataSnap => {
  //     messages.push({ ...dataSnap.val(), id: dataSnap.key });
  //     dispatch(getAllMessagesASYNCSuccess(messages));
  //   });
  // } catch (err) {
  //   console.error(err);
  //   dispatch(getAllMessagesASYNCFailure());
  // }
};
