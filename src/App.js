import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Login from "./components/pages/login";
import Signup from "./components/pages/signup";
import Homepage from "./components/pages/homepage";
import LoadingScreen from "./components/loading-screen";

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
        {/* {isFetchingUser ? (
          <LoadingScreen text="Checking user..." />
        ) : ( */}
        <main>
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route exact path="/" render={() => user && <Homepage />} />
          </Switch>
        </main>
        {/* )} */}
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
