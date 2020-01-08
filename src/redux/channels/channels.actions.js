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

//  get all the cchannels
const getAllChannelsASYNCStart = () => ({
  type: channelsActionTypes.GET_ALL_CHANNELS_START
});

const getAllChannelsASYNCSuccess = channels => ({
  type: channelsActionTypes.GET_ALL_CHANNELS_SUCCESS,
  payload: channels
});

const getAllChannelsASYNCFailure = () => ({
  type: channelsActionTypes.GET_ALL_CHANNELS_FAILURE
});

export const getAllChannelsASYNC = () => dispatch => {
  dispatch(getAllChannelsASYNCStart());
  try {
    // https://firebase.google.com/docs/database/web/lists-of-data#listen_for_child_events
    let channels = [];
    // This event is triggered once for each existing child
    //  Note: Don't forget to call detatchListeners in componentWIllUnmount
    database.ref("/channels").on("child_added", dataSnap => {
      channels.push({ ...dataSnap.val(), id: dataSnap.key });
      dispatch(getAllChannelsASYNCSuccess(channels));
    });
  } catch (err) {
    console.error(err);
    dispatch(getAllChannelsASYNCFailure());
  }
};
