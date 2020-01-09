import React, { Component } from "react";
import "./message-board.styles.scss";
import { connect } from "react-redux";
import { addMessageASYNC } from "../../redux/messages/messages.actions";
class MessageBoard extends Component {
  state = { message: "" };
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("message");
    this.props.addMessageASYNC(this.state.message);
    // this.props.createBoardASYNC(this.state.name, this.state.background);
  };

  render() {
    const { currentChannel, isAddingMessage } = this.props;
    const { message } = this.state;
    return (
      <div id="message-board" className="col-12">
        <h2>MessageBoard Area</h2>
        <h3>{currentChannel && currentChannel.name}</h3>
        <div>Current Active Channel Messages</div>
        <div>
          Add new Messages form
          <form className="card-text text-center" onSubmit={this.handleSubmit}>
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentChannel: state.channels.currentChannel,
  isAddingMessage: state.messages.isAddingMessage,
  messages: state.messages.messages
});

const mapDispatchToProps = dispatch => ({
  addMessageASYNC: message => dispatch(addMessageASYNC(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageBoard);
