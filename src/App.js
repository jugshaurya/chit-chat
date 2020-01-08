import $ from "jquery";
import Popper from "popper.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import Homepage from "./components/homepage/homepage";
import LoadingScreen from "./components/loading-screen/loading-screen.jsx";

import "./App.css";
import { getUserASYNC } from "./redux/user/user.action";
class App extends React.Component {
  componentDidMount() {
    this.props.getUserASYNC(this.props.history);
  }

  render() {
    return this.props.isFetchingUser ? (
      <LoadingScreen />
    ) : (
      <div className="App">
        <main>
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route
              exact
              path="/"
              render={() => <Homepage user={this.props.user} />}
            />
          </Switch>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  isFetchingUser: state.user.isFetchingUser
});

const mapDispatchToProps = dispatch => ({
  getUserASYNC: history => dispatch(getUserASYNC(history))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
