import channelsActionTypes from "./channels.types";
import { database } from "../../firebase/firebase";

export const closeAddChannelForm = () => ({
  type: channelsActionTypes.CLOSE_ADD_CHANNEL_FORM
});

export const openAddChannelForm = () => ({
  type: channelsActionTypes.OPEN_ADD_CHANNEL_FORM
});

export const setCurrentChannel = channel => ({
  type: channelsActionTypes.SET_CURRENT_CHANNEL,
  payload: channel
});

//  get all the channels
export const getAllChannels = channels => ({
  type: channelsActionTypes.GET_ALL_CHANNELS,
  payload: channels
});

// ASYNC
const addChannelASYNCStart = () => ({
  type: channelsActionTypes.ADD_CHANNEL_START
});

const addChannelASYNCSuccess = () => ({
  type: channelsActionTypes.ADD_CHANNEL_SUCCESS
});

const addChannelASYNCFailure = () => ({
  type: channelsActionTypes.ADD_CHANNEL_FAILURE
});

export const addChannelASYNC = (name, description) => async (
  dispatch,
  getState
) => {
  dispatch(addChannelASYNCStart());
  // https://firebase.google.com/docs/database/web/lists-of-data#append_to_a_list_of_data
  const newChannelRef = database.ref("/channels").push();
  const user = getState().user.user;
  try {
    await newChannelRef.set({
      name,
      description,
      createdBy: {
        userId: user.uid
      }
    });
    dispatch(addChannelASYNCSuccess());
  } catch (err) {
    console.error(err);
    dispatch(addChannelASYNCFailure());
  }
};
