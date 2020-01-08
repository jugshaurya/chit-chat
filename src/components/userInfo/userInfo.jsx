import React, { Component } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import "./userInfo.styles.scss";
class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { user } = this.props;
    return (
      <div id="user-info" className="col-12">
        <h2>UserInfo </h2>
        {user && (
          <>
            <Link to="/" className="profile  btn btn-link text-white ">
              <img src={user.photoURL} alt="avatar" className="p-1" />
              {user.displayName}
            </Link>
            <button
              onClick={() => auth.signOut()}
              className="btn btn-link text-white"
            >
              Sign Out
            </button>
          </>
        )}
      </div>
    );
  }
}

export default UserInfo;
