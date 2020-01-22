import React, { Component } from "react";
import { connect } from "react-redux";

import Extras from "../../areas/extras";
import MessageBoard from "../../areas/message-board";
import Channels from "../../areas/channels";
import Servers from "../../areas/servers";
import UserInfo from "../../areas/userInfo";
import MessageIndividuals from "../../areas/message-individual";

import "./homepage.styles.scss";

// Now Homepage will only be shown if there is User in store, hence user cannot be null here
class Homepage extends Component {
  render() {
    const { user, currentChannel } = this.props;

    return (
      <div className="homepage">
        <div className="item-a">
          <Servers />
        </div>
        <div className="item-b">
          <Channels />
          {/* <MessageIndividuals /> */}
        </div>
        <div className="item-c">
          <MessageBoard
            key={currentChannel && currentChannel.id}
            currentChannel={currentChannel}
          />
        </div>
        <div className="item-d">
          <Extras />
        </div>
        <div className="item-e">
          <UserInfo user={user} />
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
