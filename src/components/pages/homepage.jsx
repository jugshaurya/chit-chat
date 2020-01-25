import React, { Component } from "react";
import { connect } from "react-redux";

import Extras from "../areas/extras";
import MessageBoard from "../areas/message-board";
import Channels from "../areas/channels";
import Servers from "../areas/servers";
import UserInfo from "../areas/userInfo";
import IndividualChannels from "../areas/chats";
import { ReactComponent as Logo } from "../../assets/chat.svg";
// Now Homepage will only be shown if there is User in store, hence user cannot be null here
class Homepage extends Component {
  render() {
    const { user, currentChannel } = this.props;

    return (
      <div className="homepage">
        {/* <div className="item-a">
          <Servers />
        </div> */}
        <div className="item-b">
          <div className="top">
            <div className="logo">
              <Logo />
            </div>
            <div className="logo-right">
              <div className="appname"> ChitChat</div>
              <div className="logged-in-user">{user.displayName}</div>
            </div>
          </div>
          <Channels />
          <IndividualChannels />
        </div>
        <div className="item-c">
          {currentChannel && (
            <MessageBoard
              key={currentChannel.id}
              currentChannel={currentChannel}
            />
          )}
        </div>
        {/* <div className="item-d">
          <Extras />
        </div> */}
        {/* <div className="item-e">
          <UserInfo user={user} />
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  currentChannel: state.channels.currentChannel
});

export default connect(mapStateToProps)(Homepage);
