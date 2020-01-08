import channelActionTypes from "./channels.types";

const INITIAL_STATE = {
  channels: [],
  isFetchingChannels: false,
  isCreatingChannel: false,
  isAddChannelFormOpen: false,
  currentChannel: null
};

const channelsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case channelActionTypes.CLOSE_ADD_CHANNEL_FORM:
      return {
        ...state,
        isAddChannelFormOpen: false
      };

    case channelActionTypes.OPEN_ADD_CHANNEL_FORM:
      return {
        ...state,
        isAddChannelFormOpen: true
      };

    case channelActionTypes.SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload
      };

    case channelActionTypes.ADD_CHANNEL_START:
      return {
        ...state,
        isCreatingChannel: true
      };
    case channelActionTypes.ADD_CHANNEL_SUCCESS:
      return {
        ...state,
        isCreatingChannel: false,
        isAddChannelFormOpen: false,
        channels: [...state.channels, action.payload]
      };
    case channelActionTypes.ADD_CHANNEL_FAILURE:
      return {
        ...state,
        isCreatingChannel: false,
        isAddChannelFormOpen: false
      };

    case channelActionTypes.GET_ALL_CHANNELS_START:
      return {
        ...state,
        isFetchingChannels: true
      };

    case channelActionTypes.GET_ALL_CHANNELS_SUCCESS:
      return {
        ...state,
        isFetchingChannels: false,
        channels: action.payload
      };
    case channelActionTypes.GET_ALL_CHANNELS_FAILURE:
      return {
        ...state,
        isFetchingChannels: false
      };
    default:
      return state;
  }
};

export default channelsReducer;
