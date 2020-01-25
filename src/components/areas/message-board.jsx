import React, { Component } from "react";
import { connect } from "react-redux";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

import { database } from "../../firebase/firebase";
import Extras from "./extras";
import {
  addMessageASYNC,
  openUploadMediaForm
} from "../../redux/messages/messages.actions";

import { ReactComponent as InfoSvg } from "../../assets/information.svg";
import { ReactComponent as SettingSvg } from "../../assets/setting.svg";
import { ReactComponent as SendSvg } from "../../assets/send.svg";

class MessageBoard extends Component {
  state = {
    message: "",
    file: "",
    realtimeMessages: [],
    numberOfUniqueUsers: 0,
    openEmojiPicker: false,
    messagesCountPerUserArray: []
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
          }, []).length,
          messagesCountPerUserArray: Object.entries(
            realtimeMessages.reduce((acc, message) => {
              if (!acc[message.createdBy.username]) {
                acc[message.createdBy.username] = {
                  user: message.createdBy,
                  count: 0
                };
              } else {
                acc[message.createdBy.username].count += 1;
              }
              return acc;
            }, {})
          )
        });
      });
  };

  componentDidMount() {
    if (this.props.currentChannel) {
      this.getCurrentChannelData(this.props.currentChannel);
    }
  }

  addEmoji = e => {
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

  handleEnterSubmit = e => {
    e.preventDefault();
    console.log("entered");
    // this.handleSubmit(e);
  };

  render() {
    const { currentChannel, isAddingMessage, user } = this.props;
    const {
      message,
      realtimeMessages,
      numberOfUniqueUsers,
      messagesCountPerUserArray
    } = this.state;

    return (
      <div className="message-board">
        <header>
          <section className="header-left">
            <img src={currentChannel.image} alt="channel-image" />
            <div className="current-channel">
              <h4>{currentChannel.name}</h4>
              <span>{numberOfUniqueUsers} members</span>
            </div>
          </section>
          <section className="header-right">
            <span>
              {" "}
              <InfoSvg />{" "}
            </span>
            <span>
              {/* TODO */}{" "}
              <form>
                <input type="text" placeholder="search" />
              </form>{" "}
            </span>
            {/* Change avatar, signout, username */}
            <span>
              {" "}
              <SettingSvg />{" "}
            </span>
          </section>
        </header>
        <main>
          <ul>
            {realtimeMessages.map(message => (
              // TODO :change classnmae selction according to use id not avatar url
              <li
                key={message.id}
                className={
                  message.createdBy.avatarURL === this.props.user.photoURL
                    ? "my-message"
                    : null
                }
              >
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
                    <div className="messagediv messageimg">
                      <img
                        src={message.image}
                        alt="Uploadedimg"
                        width="100"
                        height="100"
                      />
                    </div>
                  ) : (
                    <div className="messagediv">{message.message}</div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </main>
        <aside>
          <Extras messagesCountPerUserArray={messagesCountPerUserArray} />
        </aside>
        <footer>
          <img src={user.photoURL} alt="user-image" />
          <div className="form">
            <div className="input-with-btn">
              <input
                id="message"
                type="text"
                name="message"
                placeholder="Type something here..."
                onChange={this.handleChange}
                value={message}
                required
                // onKeyDown={this.handleEnterSubmit}
              />

              {/* Add Emoji btn */}
              <div className="button-emoji" onClick={this.togglePickEmoji}>
                <span role="img" aria-labelledby="emoji">
                  🙂
                </span>
              </div>
              <span
                className="emoji-picker"
                style={{
                  display: `${this.state.openEmojiPicker ? "inline" : "none"}`
                }}
              >
                <Picker onSelect={this.addEmoji} />
              </span>
              {/* Upload Media btn */}
              {this.props.isUploadFormOpen ? (
                <div>...</div>
              ) : (
                <div
                  className="button-upload"
                  onClick={this.props.openUploadMediaForm}
                >
                  <span role="img" aria-labelledby="emoji">
                    📎
                  </span>
                </div>
              )}
            </div>

            {/* Add message btn */}
            {isAddingMessage ? (
              <button type="button" className="button-submit">
                ...
              </button>
            ) : (
              <button
                type="submit"
                className="button-submit"
                onClick={this.handleSubmit}
              >
                <SendSvg />
              </button>
            )}
          </div>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAddingMessage: state.messages.isAddingMessage,
  isUploadFormOpen: state.messages.isUploadFormOpen,
  user: state.user.user
});

const mapDispatchToProps = dispatch => ({
  addMessageASYNC: message => dispatch(addMessageASYNC(message)),
  openUploadMediaForm: () => dispatch(openUploadMediaForm())
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageBoard);
