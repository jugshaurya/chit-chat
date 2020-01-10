import React, { Component } from "react";
import { connect } from "react-redux";

import Extras from "../extras/extras";
import MessageBoard from "../message-board/message-board";
import Channels from "../channels/channels";
import Servers from "../servers/servers";
import UserInfo from "../userInfo/userInfo";

import "./homepage.styles.scss";

// Now Homepage will only be shown if there is User in store, hence user cannot be null here
class Homepage extends Component {
  render() {
    const { user, currentChannel } = this.props;

    return (
      <div className="homepage container-fluid">
        <div className="row">
          <div className="col-4">
            <div className="row ">
              <Servers />
              <Channels />
            </div>
            <div className="row">
              <UserInfo user={user} />
            </div>
          </div>
          <div className="col-6">
            <MessageBoard
              key={currentChannel && currentChannel.id}
              currentChannel={currentChannel}
            />
          </div>
          <div className="col-2">
            <Extras />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  currentChannel: state.channels.currentChannel
});

export default connect(mapStateToProps)(Homepage);
