import React from "react";
import firebase, { database } from "../../firebase/firebase";
import { connect } from "react-redux";

import { setCurrentChannel } from "../../redux/channels/channels.actions";
class Chats extends React.Component {
  state = {
    otherUsers: [],
    realtimeMessages: [],
    numberOfUniqueUsers: 0
  };

  componentDidMount() {
    let otherUsers = [];
    database.ref("users").on("child_added", userSnap => {
      otherUsers.push({
        ...userSnap.val(),
        uid: userSnap.key,
        state: "offline",
        last_changed: Date.now()
      });
      this.setState({ otherUsers });
    });

    this.userOnlineOrOffline();
  }

  userOnlineOrOffline = () => {
    const userStatusDBRef = database.ref("/status/" + this.props.user.uid);
    const isOfflineForDatabase = {
      state: "offline",
      last_changed: firebase.database.ServerValue.TIMESTAMP
    };

    const isOnlineForDatabase = {
      state: "online",
      last_changed: firebase.database.ServerValue.TIMESTAMP
    };

    // Create a reference to the special '.info/connected' path in
    // Realtime Database. This path returns `true` when connected
    // and `false` when disconnected.
    database.ref(".info/connected").on("value", snapshot => {
      // if this user is connected
      if (snapshot.val() === true) {
        // userStatusDBRef.set({ online: true });
        // TODO: Also Disconnect user when user signout
        userStatusDBRef
          .onDisconnect()
          .set(isOfflineForDatabase)
          .then(() => {
            userStatusDBRef.set(isOnlineForDatabase);
          });
      }
    });

    database.ref("/status").on("child_changed", dataSnap => {
      const otherUsers = this.state.otherUsers.map(user =>
        user.uid === dataSnap.key
          ? {
              ...user,
              state: dataSnap.val().state,
              last_changed: dataSnap.val().last_changed
            }
          : user
      );
      this.setState({ otherUsers });
    });

    database.ref("/status").on("child_added", dataSnap => {
      const otherUsers = this.state.otherUsers.map(user => {
        return user.uid === dataSnap.key
          ? {
              ...user,
              state: dataSnap.val().state,
              last_changed: dataSnap.val().last_changed
            }
          : user;
      });
      this.setState({ otherUsers });
    });
  };

  getChannelFromUser = user => {
    const talkingUserId = this.props.user.uid;
    const listeningUserId = user.uid;
    const channelId =
      talkingUserId < listeningUserId
        ? `${talkingUserId}/${listeningUserId}`
        : `${listeningUserId}/${talkingUserId}`;
    // return channel here not id
    return {
      id: channelId,
      name: user.username
    };
  };

  getDate(timestamp) {
    const dateObj = new Date(timestamp * 1000);
    const year = dateObj.getFullYear();
    const month = dateObj.getUTCMonth();
    const day = dateObj.getUTCDay();
    return `${day}/${month}/${year}`;
  }

  render() {
    const { otherUsers } = this.state;
    const { currentChannel } = this.props;
    return (
      <div className="chats">
        <div className="chats-heading">
          Chats ({otherUsers.length > 0 ? otherUsers.length - 1 : 0})
        </div>
        <div className="display-indiv-channels">
          <ul>
            {otherUsers
              .filter(user => user.uid !== this.props.user.uid)
              .map(user => (
                <li
                  key={user.uid}
                  className={
                    currentChannel &&
                    currentChannel.id === this.getChannelFromUser(user).id
                      ? "highlight"
                      : null
                  }
                  onClick={() =>
                    this.props.setCurrentChannel(this.getChannelFromUser(user))
                  }
                >
                  <div className="user">
                    <div className="user-image">
                      <img src={user.avatarURL} alt="useravatar" />
                      <div
                        className={
                          user.state === "online" ? "online" : "offline"
                        }
                      ></div>
                    </div>
                    <div className="user-info">
                      <div className="another">
                        <div className="val">{user.username}</div>
                        <div className="date">
                          {this.getDate(user.last_changed)}
                        </div>
                      </div>
                      <div className="desc">
                        Lorem ipsum dolor sit amet ametamet ...{" "}
                      </div>
                    </div>
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
  user: state.user.user,
  currentChannel: state.channels.currentChannel
});

const mapDispatchToProps = dispatch => ({
  setCurrentChannel: channel => dispatch(setCurrentChannel(channel))
});

export default connect(mapStateToProps, mapDispatchToProps)(Chats);
