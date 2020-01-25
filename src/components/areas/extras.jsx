import React, { Component } from "react";
import { connect } from "react-redux";
import { storage } from "../../firebase/firebase";
import uuidv5 from "uuid/v5";

import {
  addChannelASYNC,
  closeAddChannelForm
} from "../../redux/channels/channels.actions";

import {
  closeUploadMediaForm,
  addMessageASYNC
} from "../../redux/messages/messages.actions";

class Extras extends Component {
  state = {
    newChannelName: "",
    newChannelDescription: "",
    newChanneImage:
      "https://images.unsplash.com/photo-1577389407691-a11418fb5341?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixlib=rb-1.2.1&q=80&w=800",
    description: "",
    file: null,
    isUploading: false,
    uploadProgress: 0
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleFileChange = e => {
    const file = e.target.files[0];
    this.setState({ file });
  };

  handleChannelCreation = e => {
    e.preventDefault();
    this.props.addChannelASYNC(
      this.state.newChannelName,
      this.state.newChannelDescription,
      this.state.newChanneImage
    );
  };

  handleUploadMedia = e => {
    e.preventDefault();
    const file = this.state.file;
    // https://firebase.google.com/docs/storage/web/upload-files
    if (
      file &&
      (file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/jpg")
    ) {
      const uuidvalue = uuidv5(`file.name/${Date.now()}`, uuidv5.DNS);

      var metadata = {
        contentType: file.type
      };
      const uploadTask = storage
        .ref()
        .child(`images/${uuidvalue}-${file.name}`)
        .put(file, metadata);

      this.setState({ uploading: true });
      uploadTask.on(
        "state_changed",
        snapshot => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
          this.setState({ uploadProgress: progress });
          // switch (snapshot.state) {
          //   case "paused":
          //     console.log("Upload is paused");
          //     break;
          //   case "running":
          //     console.log("Upload is running");
          //     break;
          // }
        },
        err => {
          console.error(err);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.setState({ uploading: false });
            this.props.addMessageASYNC({ type: "image", url: downloadURL });
          });
        }
      );
    }
  };
  render() {
    const {
      isAddChannelFormOpen,
      currentChannel,
      messagesCountPerUserArray
    } = this.props;
    return (
      <div className="extras">
        <img
          className="extrasimg"
          src={currentChannel.image}
          alt="channel-image"
        />
        <h4>{currentChannel.name}</h4>
        <ul className="most-post-users">
          {messagesCountPerUserArray.map(user => {
            console.log(user);
            return (
              <li key={user[1].user.username}>
                <img src={user[1].user.avatarURL} alt="user-image" />
                <div className="user">
                  <div className="name">
                    <span>{user[1].user.username}</span>
                  </div>
                  <span className="count">{user[1].count} chats</span>
                </div>
              </li>
            );
          })}
        </ul>

        {/* {isAddChannelFormOpen ? (
          <>
            <h2> Form</h2>
            <form
              className="card-text text-center"
              onSubmit={this.handleChannelCreation}
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
              <div className="form-group ml-md-3 text-md-left">
                <label htmlFor="channelimage"> Channel Image</label>
                <input
                  id="channelimage"
                  className="form-control"
                  type="url"
                  name="newChanneImage"
                  placeholder="Image"
                  onChange={this.handleChange}
                  value={this.state.newChanneImage}
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
          <h2> Add Channel Extra</h2>
        )}

        {this.props.isUploadFormOpen ? (
          <>
            <h2> Upload Form</h2>
            {this.props.isAddingMessage || this.state.uploading ? (
              <div>Uploading...</div>
            ) : (
              <form onSubmit={this.handleUploadMedia}>
                <input
                  type="file"
                  onChange={this.handleFileChange}
                  accept=".jpg, .png, .jpeg"
                />
                <button type="submit" className="btn btn-primary px-2">
                  Upload
                </button>
                <button
                  className="btn btn-primary px-2"
                  onClick={this.props.closeUploadMediaForm}
                  type="button"
                >
                  Cancel
                </button>
              </form>
            )}
          </>
        ) : (
          <h2> Add Channel Extra</h2>
        )} */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAddChannelFormOpen: state.channels.isAddChannelFormOpen,
  isAddingMessage: state.messages.isAddingMessage, // yes this is intentional
  isUploadFormOpen: state.messages.isUploadFormOpen,
  currentChannel: state.channels.currentChannel
});

const mapDispatchToProps = dispatch => ({
  closeAddChannelForm: () => dispatch(closeAddChannelForm()),
  closeUploadMediaForm: () => dispatch(closeUploadMediaForm()),
  addMessageASYNC: message => dispatch(addMessageASYNC(message)),

  addChannelASYNC: (name, description, image) =>
    dispatch(addChannelASYNC(name, description, image))
});

export default connect(mapStateToProps, mapDispatchToProps)(Extras);
