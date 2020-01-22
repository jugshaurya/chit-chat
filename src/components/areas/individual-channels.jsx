import React from "react";
import firebase, { database } from "../../firebase/firebase";
import { connect } from "react-redux";

import { setCurrentChannel } from "../../redux/channels/channels.actions";
class IndividualChannels extends React.Component {
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
      console.log(dataSnap.val(), dataSnap.key);

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
        console.log(dataSnap.key, user.uid);

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
    const talkingUser = this.props.user;
    const listeningUser = user;
    console.log(listeningUser);
    const channelId =
      talkingUser < listeningUser
        ? `${talkingUser.uid}/${listeningUser.uid}`
        : `${listeningUser.uid}/${talkingUser.uid}`;
    // return channel here not id
    return {
      id: channelId,
      name: listeningUser.username
    };
  };

  render() {
    const { otherUsers } = this.state;
    return (
      <div id="indiv-channels">
        <div className="channel-heading">
          Private Messages ({otherUsers.length - 1})
        </div>
        <div className="display-indiv-channels">
          <ul>
            {otherUsers
              .filter(user => user.uid !== this.props.user.uid)
              .map(user => (
                <li
                  key={user.uid}
                  // className={
                  //   currentChannel && currentChannel.id === this.getChannelFromUser(user).uid
                  //     ? "highlight"
                  //     : null
                  // }

                  onClick={() =>
                    this.props.setCurrentChannel(this.getChannelFromUser(user))
                  }
                >
                  <div className="username">
                    <span role="img" aria-labelledby="emoji">
                      📣
                    </span>{" "}
                    {user.username}
                  </div>
                  <div
                    className={user.state === "online" ? "online" : "offline"}
                  ></div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user
});

const mapDispatchToProps = dispatch => ({
  setCurrentChannel: channel => dispatch(setCurrentChannel(channel))
});

export default connect(mapStateToProps, mapDispatchToProps)(IndividualChannels);
