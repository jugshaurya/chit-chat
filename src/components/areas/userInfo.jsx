import React, { Component } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase";

import { ReactComponent as SearchIcon } from "../../assets/search.svg";
import { ReactComponent as LogoutIcon } from "../../assets/logout.svg";
class UserInfo extends Component {
  state = {
    search: "",
    show: false
  };

  showSearchBox = () => {
    this.setState({ show: true });
  };

  handleChange = e => {
    this.setState({ search: e.target.value });
  };

  handleSearchSubmit = e => {
    // TODO
    e.preventDefault();
    this.setState({ show: false });
  };

  render() {
    const { user } = this.props;
    return (
      <div id="user-info">
        {user && (
          <>
            <div className="item-a">
              <img src={user.photoURL} alt="avatar" className="avatar" />
              {/* TODO */}
              <div className={user.stateurt ? "status green" : "status red"}>
                sa
              </div>
            </div>
            <div className="item-b" className="search-channel">
              {this.state.show ? (
                <form
                  onSubmit={this.handleSearchSubmit}
                  className="search-channel-form"
                >
                  <input
                    type="text"
                    name="search"
                    placeholder="channel"
                    onChange={this.handleChange}
                  />
                  <button type="submit"> Go </button>
                </form>
              ) : (
                <>
                  <div className="username">{user.displayName}</div>
                  <SearchIcon onClick={this.showSearchBox} />
                </>
              )}
            </div>
            <div className="item-c" className="signout">
              <button
                onClick={() => auth.signOut()}
                className="btn btn-link text-white"
              >
                <LogoutIcon />
              </button>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default UserInfo;
