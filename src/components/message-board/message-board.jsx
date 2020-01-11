import React, { Component } from "react";
import { connect } from "react-redux";
import { database } from "../../firebase/firebase";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

import {
  addMessageASYNC,
  openUploadMediaForm
} from "../../redux/messages/messages.actions";

import "./message-board.styles.scss";

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
  };

  handleMediaUpload = e => {
    const file = e.target.files[0];
    console.log(file);
    this.setState({ file });
  };

  componentDidMount() {
    let realtimeMessages = [];
    if (this.props.currentChannel) {
      const currentChannelId = this.props.currentChannel.id;

      // Messages are separate from data we may want to iterate quickly
      // but still easily paginated and queried, and organized by chat
      // conversation ID
      // Source: Firebase
      console.log(`/messages/${currentChannelId}`);

      database
        .ref(`/messages/${currentChannelId}`)
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
      <div id="message-board" className="col-12">
        <div style={{ width: "60vw", height: "60vh", overflowY: "scroll" }}>
          <h2>MessageBoard Area</h2>
          <h3>{currentChannel && currentChannel.name}</h3>
          <h6>{numberOfUniqueUsers} Users</h6>

          <ul>
            {realtimeMessages.map(message => (
              <li key={message.id}>
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
                <div>{message.createdBy.username}</div>
                <div>{message.createdBy.avatarURL}</div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          Add new Messages form
          {isAddingMessage ? (
            <div>Adding Message...</div>
          ) : (
            <form
              className="card-text text-center"
              onSubmit={this.handleSubmit}
            >
              <div className="form-group ml-md-3 text-md-left">
                <label htmlFor="message">Message: </label>
                <input
                  id="message"
                  className="form-control"
                  type="text"
                  name="message"
                  placeholder="Enter Message"
                  onChange={this.handleChange}
                  value={message}
                  required
                />
              </div>

              <button className="btn btn-primary px-2" type="submit">
                Add
              </button>
            </form>
          )}
          <br />
          {this.props.isUploadFormOpen ? (
            <div>Select File from Extra section</div>
          ) : (
            <button
              className="btn btn-primary px-2"
              type="button"
              onClick={this.props.openUploadMediaForm}
            >
              Upload Media
            </button>
          )}
          <br />
          <div onClick={this.togglePickEmoji}>Pick Emoji</div>
          <span
            style={{
              visibility: `${this.state.openEmojiPicker ? "visible" : "hidden"}`
            }}
          >
            <Picker onSelect={this.addEmoji} />
          </span>
        </div>
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
