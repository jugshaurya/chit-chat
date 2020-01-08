import React, { Component } from "react";
import { ReactComponent as AddChannelIcon } from "../../assets/addChannel.svg";
import "./channels.styles.scss";
import {
  openAddChannelForm,
  setCurrentChannel,
  getAllChannelsASYNC
} from "../../redux/channels/channels.actions";
import { connect } from "react-redux";
import { database } from "../../firebase/firebase";

class Channels extends Component {
  componentDidMount() {
    this.props.getAllChannelsASYNC(database.ref("/channels"));
  }

  componentWillUnmount() {
    // https://firebase.google.com/docs/database/web/lists-of-data#detach_listeners
    // console.log("Detached!");
    // Problem Not Working ????? Raise an Issue
    // database.ref("/channels").off("child_added");
  }

  handleAddChannel = () => {
    this.props.openAddChannelForm();
  };

  setInitialCurrentChannel() {
    const { currentChannel, channels, setCurrentChannel } = this.props;
    if (!currentChannel && channels.length > 0) {
      setCurrentChannel(channels[0]);
    }
  }

  render() {
    const {
      channels,
      isAddChannelFormOpen,
      isFetchingChannels,
      currentChannel
    } = this.props;
    console.log(channels);
    // Setting initial Active Channel
    {
      this.setInitialCurrentChannel();
    }
    return (
      <div id="channels-area" className="col-10">
        <h2>Channels Area</h2>
        {!isAddChannelFormOpen && (
          <AddChannelIcon onClick={this.handleAddChannel} />
        )}
        <br /> Channels <span>{channels.length}</span>
        <br />
        <ul>
          {console.log(isFetchingChannels)}
          {isFetchingChannels ||
            channels.map(channel => (
              <li
                key={channel.id}
                onClick={() => this.props.setCurrentChannel(channel)}
              >
                <div
                  className={
                    currentChannel && currentChannel.id === channel.id
                      ? "alert alert-info"
                      : ""
                  }
                >
                  {channel.name}
                </div>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  channels: state.channels.channels,
  isAddChannelFormOpen: state.channels.isAddChannelFormOpen,
  isFetchingChannels: state.channels.isFetchingChannels,
  currentChannel: state.channels.currentChannel
});

const mapDispatchToProps = dispatch => ({
  openAddChannelForm: () => dispatch(openAddChannelForm()),
  setCurrentChannel: channel => dispatch(setCurrentChannel(channel)),
  getAllChannelsASYNC: () => dispatch(getAllChannelsASYNC())
});

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
