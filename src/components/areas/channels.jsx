import React, { Component } from "react";
import { connect } from "react-redux";
import { database } from "../../firebase/firebase";

import MessageIndividual from "./individual-channels";

import {
  openAddChannelForm,
  setCurrentChannel,
  getAllChannels
} from "../../redux/channels/channels.actions";

import { ReactComponent as AddChannelIcon } from "../../assets/addChannel.svg";

class Channels extends Component {
  state = {
    realtimeChannels: []
  };

  componentDidMount() {
    let realtimeChannels = [];
    database.ref("/channels").on("child_added", dataSnap => {
      realtimeChannels.push({ ...dataSnap.val(), id: dataSnap.key });
      // console.log(channels);
      this.setState({ realtimeChannels: realtimeChannels }, () => {
        this.props.getAllChannels(this.state.realtimeChannels);
      });
    });
  }

  componentWillUnmount() {
    // https://firebase.google.com/docs/database/web/lists-of-data#detach_listeners
    database.ref("/channels").off("child_added");
  }

  handleAddChannel = () => {
    this.props.openAddChannelForm();
  };

  setInitialCurrentChannel(channel) {
    const { setCurrentChannel } = this.props;
    setCurrentChannel(channel);
  }

  componentDidUpdate() {
    // Setting initial Active Channel
    if (this.props.channels.length > 0 && !this.props.currentChannel) {
      this.setInitialCurrentChannel(this.props.channels[0]);
    }
  }

  render() {
    const {
      channels,
      isAddChannelFormOpen,
      currentChannel,
      setCurrentChannel
    } = this.props;

    return (
      <div id="all-text-channel">
        <div className="text-channels">
          <div className="channel-heading">
            Text Channels ({channels.length})
          </div>
          <div className="add-channel">
            {!isAddChannelFormOpen && (
              <AddChannelIcon onClick={this.handleAddChannel} />
            )}
          </div>
        </div>
        <div className="display-text-channels">
          <ul>
            {channels.map(channel => (
              <li
                key={channel.id}
                className={
                  currentChannel && currentChannel.id === channel.id
                    ? "highlight"
                    : null
                }
              >
                <div onClick={() => setCurrentChannel(channel)}>
                  # {channel.name}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  channels: state.channels.channels,
  isAddChannelFormOpen: state.channels.isAddChannelFormOpen,
  currentChannel: state.channels.currentChannel
});

const mapDispatchToProps = dispatch => ({
  openAddChannelForm: () => dispatch(openAddChannelForm()),
  setCurrentChannel: channel => dispatch(setCurrentChannel(channel)),
  getAllChannels: channels => dispatch(getAllChannels(channels))
});

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
