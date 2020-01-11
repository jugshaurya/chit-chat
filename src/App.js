import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import Homepage from "./components/homepage/homepage";
import Navbar from "./components/navbar/navbar";
import LoadingScreen from "./components/loading-screen/loading-screen";

import { getUserASYNC } from "./redux/user/user.action";
import "./App.css";

class App extends React.Component {
  componentDidMount() {
    this.props.getUserASYNC(this.props.history);
  }

  render() {
    const { isFetchingUser, user } = this.props;
    return (
      <div className="App">
        {isFetchingUser ? (
          <LoadingScreen text="Checking user..." />
        ) : (
          <>
            <div className="content">
              <header className="fixed-top">
                <Navbar user={user} />
              </header>
              <main>
                <Switch>
                  <Route path="/signup" component={Signup} />
                  <Route path="/login" component={Login} />
                  <Route exact path="/" render={() => user && <Homepage />} />
                </Switch>
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
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isFetchingUser: state.user.isFetchingUser,
  user: state.user.user
});

const mapDispatchToProps = dispatch => ({
  getUserASYNC: history => dispatch(getUserASYNC(history))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
