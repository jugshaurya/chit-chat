import React from "react";
import firebase, { database } from "../../firebase/firebase";
import { connect } from "react-redux";
class MessageIndividuals extends React.Component {
  state = {
    otherUsers: []
  };

  componentDidMount() {
    let otherUsers = [];
    database.ref("users").on("child_added", userSnap => {
      otherUsers.push({
        ...userSnap.val(),
        id: userSnap.key,
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
        user.id === dataSnap.key
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
      console.log(dataSnap.val(), dataSnap.key);

      const otherUsers = this.state.otherUsers.map(user =>
        user.id === dataSnap.key
          ? {
              ...user,
              state: dataSnap.val().state,
              last_changed: dataSnap.val().last_changed
            }
          : user
      );
      this.setState({ otherUsers });
    });
  };

  render() {
    return (
      <div id="individual-messages">
        <h2>MessageIndividuals</h2>
        <ul>
          {this.state.otherUsers.map(user => {
            return user.id !== this.props.user.uid ? (
              <li
                className={
                  user.state === "online" ? "text-success" : "text-danger"
                }
                key={user.id}
              >
                {user.username}
              </li>
            ) : null;
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user
});

export default connect(mapStateToProps)(MessageIndividuals);
