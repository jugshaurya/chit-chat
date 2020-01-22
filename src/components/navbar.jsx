import React, { Component } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase";
// Style Import
import { ReactComponent as ChatIcon } from "../assets/chat.svg";
import "./navbar.styles.scss";

class Navbar extends Component {
  render() {
    const { user } = this.props;
    return (
      <nav className="navbar py-2 px-4 d-flex align-items-center">
        <Link to="/" className="navbar-left d-flex flex-row">
          <ChatIcon />
          <div className="navbar-left-text d-flex flex-column ml-1">
            <span className="text-white">Chit</span>
            <span className="text-white">Chat</span>
          </div>
        </Link>
        <div className="navbar-right">
          {user ? (
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
          ) : (
            <>
              <Link
                to="/login"
                className="remove-padding btn btn-link text-white"
              >
                Log In
              </Link>
              <Link to="/signup" className="btn btn-link text-white">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    );
  }
}

export default Navbar;
