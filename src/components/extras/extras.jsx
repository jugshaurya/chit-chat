import React, { Component } from "react";
import { connect } from "react-redux";

import {
  addChannelASYNC,
  closeAddChannelForm
} from "../../redux/channels/channels.actions";
import "./extras.styles.scss";
class Extras extends Component {
  state = {
    newChannelName: "",
    newChannelDescription: "",
    description: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addChannelASYNC(
      this.state.newChannelName,
      this.state.newChannelDescription
    );
  };

  render() {
    const { isAddChannelFormOpen } = this.props;
    return (
      <div id="extras-area" className="col-12">
        <h2>Extras Area</h2>
        {isAddChannelFormOpen ? (
          <>
            <h2> Form</h2>
            <form
              className="card-text text-center"
              onSubmit={this.handleSubmit}
            >
              <div className="form-group ml-md-3 text-md-left">
                <label htmlFor="newChannelName">Name</label>
                <input
                  id="newChannelName"
                  className="form-control"
                  type="text"
                  name="newChannelName"
                  placeholder="Enter Name"
                  onChange={this.handleChange}
                  value={this.state.newChannelName}
                  required
                />
              </div>
              <div className="form-group ml-md-3 text-md-left">
                <label htmlFor="description"> Description</label>
                <input
                  id="description"
                  className="form-control"
                  type="text"
                  name="newChannelDescription"
                  placeholder="Enter Description"
                  onChange={this.handleChange}
                  value={this.state.newChannelDescription}
                  required
                />
              </div>

              <button className="btn btn-primary px-2" type="submit">
                Add channel
              </button>
              <button
                className="btn btn-primary px-2"
                onClick={this.props.closeAddChannelForm}
                type="button"
              >
                Cancel
              </button>
            </form>
          </>
        ) : (
          <h2> Extra Information</h2>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAddChannelFormOpen: state.channels.isAddChannelFormOpen
});

const mapDispatchToProps = dispatch => ({
  closeAddChannelForm: () => dispatch(closeAddChannelForm()),
  addChannelASYNC: (name, description) =>
    dispatch(addChannelASYNC(name, description))
});

export default connect(mapStateToProps, mapDispatchToProps)(Extras);
