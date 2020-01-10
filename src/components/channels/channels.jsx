import React, { Component } from "react";
import { connect } from "react-redux";
import { database } from "../../firebase/firebase";

import {
  openAddChannelForm,
  setCurrentChannel,
  getAllChannels
} from "../../redux/channels/channels.actions";

import { ReactComponent as AddChannelIcon } from "../../assets/addChannel.svg";
import "./channels.styles.scss";

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
    console.log("sdjg");
    const { setCurrentChannel } = this.props;
    setCurrentChannel(channel);
  }

  render() {
    const {
      channels,
      isAddChannelFormOpen,
      currentChannel,
      setCurrentChannel
    } = this.props;

    return (
      <>
        <div id="channels-area" className="col-10">
          {channels.length > 0 && !currentChannel ? (
            // Setting initial Active Channel
            this.setInitialCurrentChannel(channels[0])
          ) : (
            <>
              <h2>Channels Area</h2>
              {!isAddChannelFormOpen && (
                <AddChannelIcon onClick={this.handleAddChannel} />
              )}
              <br /> Channels <span>{channels.length}</span>
              <br />
              <ul>
                {channels.map(channel => (
                  <li
                    key={channel.id}
                    className={
                      currentChannel && currentChannel.id === channel.id
                        ? "alert alert-info"
                        : null
                    }
                  >
                    <div onClick={() => setCurrentChannel(channel)}>
                      {channel.name}
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </>
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
