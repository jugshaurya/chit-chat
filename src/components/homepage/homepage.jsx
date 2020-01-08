import React, { Component } from "react";
import Extras from "../extras/extras";
import MessageBoard from "../message-board/message-board";
import Channels from "../channels/channels";
import Servers from "../servers/servers";
import UserInfo from "../userInfo/userInfo";
import Navbar from "../navbar/navbar";
import "./homepage.styles.scss";

class Homepage extends Component {
  state = {};
  render() {
    const { user } = this.props;
    return (
      <>
        <div className="content">
          <header className="fixed-top">
            <Navbar user={user} />
          </header>
          <main>
            <div className="homepage container-fluid">
              <div className="row">
                <div className="col-4">
                  <div className="row ">
                    <Servers />
                    <Channels />
                  </div>
                  <div className="row">
                    <UserInfo user={user} />
                  </div>
                </div>

                <div className="col-6">
                  <MessageBoard />
                </div>
                <div className="col-2">
                  <Extras />
                </div>
              </div>
            </div>
          </main>
        </div>

        <footer>
          <div className="container mt-3">
            <div className="row text-center align-items-center">
              <div className="col">
                Made with
                <span role="img" aria-labelledby="emoji">
                  💙
                </span>
                by Shaurya Singhal
              </div>
            </div>
          </div>
        </footer>
      </>
    );
  }
}

export default Homepage;
