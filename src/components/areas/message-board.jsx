import React, { Component } from "react";
import { connect } from "react-redux";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

import { database } from "../../firebase/firebase";

import {
  addMessageASYNC,
  openUploadMediaForm
} from "../../redux/messages/messages.actions";

class MessageBoard extends Component {
  state = {
    message: "",
    file: "",
    realtimeMessages: [],
    numberOfUniqueUsers: 0,
    openEmojiPicker: false
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addMessageASYNC({ type: "text", message: this.state.message });
    this.setState({ message: "", openEmojiPicker: false });
  };

  handleMediaUpload = e => {
    const file = e.target.files[0];
    console.log(file);
    this.setState({ file });
  };

  getCurrentChannelData = currentChannel => {
    let realtimeMessages = [];
    database
      .ref(`/messages/${currentChannel.id}`)
      .on("child_added", dataSnap => {
        realtimeMessages.push({ ...dataSnap.val(), id: dataSnap.key });
        this.setState({
          realtimeMessages: realtimeMessages,
          numberOfUniqueUsers: realtimeMessages.reduce((acc, message) => {
            if (!acc.includes(message.createdBy.username)) {
              acc.push(message.createdBy.username);
            }
            return acc;
          }, []).length
        });
      });
  };

  componentDidMount() {
    if (this.props.currentChannel) {
      this.getCurrentChannelData(this.props.currentChannel);
    }
  }

  addEmoji = e => {
    console.log(e.native);
    let emoji = e.native;
    this.setState({
      message: this.state.message + emoji
    });
  };

  togglePickEmoji = () => {
    this.setState({ openEmojiPicker: !this.state.openEmojiPicker });
  };

  componentWillUnmount() {
    database.ref(`/messages`).off();
  }

  render() {
    const { currentChannel, isAddingMessage } = this.props;
    const { message, realtimeMessages, numberOfUniqueUsers } = this.state;

    return (
      <div id="message-board">
        <header>
          <h4>{currentChannel && `# ${currentChannel.name}`}</h4>
          <h6>{numberOfUniqueUsers} Users</h6>
        </header>
        <main>
          <ul>
            {realtimeMessages.map(message => (
              <li key={message.id}>
                <div className="avatar">
                  <img src={message.createdBy.avatarURL} alt="user-avatar" />
                </div>
                <div className="user-and-message">
                  <div className="user-and-time">
                    <span className="user">{message.createdBy.username}</span>
                    {/* TODO */}
                    <span className="time"> {"2 hours ago"} </span>
                  </div>
                  {message.image ? (
                    <img
                      src={message.image}
                      alt="Uploadedimg"
                      width="100"
                      height="100"
                    />
                  ) : (
                    <div>{message.message}</div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </main>
        <footer>
          <form onSubmit={this.handleSubmit}>
            {/* Upload Media btn */}
            {this.props.isUploadFormOpen ? (
              <button type="button">...</button>
            ) : (
              <button
                type="button"
                className="button-upload"
                onClick={this.props.openUploadMediaForm}
              >
                <span role="img" aria-labelledby="emoji">
                  ➕
                </span>
              </button>
            )}
            <input
              id="message"
              type="text"
              name="message"
              placeholder="Enter Message"
              onChange={this.handleChange}
              value={message}
              required
            />

            {/* Add Emoji btn */}
            <button
              type="button"
              className="button-emoji"
              onClick={this.togglePickEmoji}
            >
              <span role="img" aria-labelledby="emoji">
                🍔
              </span>
            </button>
            <span
              className="emoji-picker"
              style={{
                visibility: `${
                  this.state.openEmojiPicker ? "visible" : "hidden"
                }`
              }}
            >
              <Picker onSelect={this.addEmoji} />
            </span>

            {/* Add message btn */}
            {isAddingMessage ? (
              <button type="button" className="button-submit">
                ...
              </button>
            ) : (
              <button type="submit" className="button-submit">
                <span role="img" aria-labelledby="emoji">
                  📲
                </span>
              </button>
            )}
          </form>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAddingMessage: state.messages.isAddingMessage,
  isUploadFormOpen: state.messages.isUploadFormOpen
});

const mapDispatchToProps = dispatch => ({
  addMessageASYNC: message => dispatch(addMessageASYNC(message)),
  openUploadMediaForm: () => dispatch(openUploadMediaForm())
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageBoard);
