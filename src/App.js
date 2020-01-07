import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import Homepage from "./components/homepage/homepage";

import "./App.css";

function App() {
  return (
    <div className="App">
      <main>
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Homepage} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
