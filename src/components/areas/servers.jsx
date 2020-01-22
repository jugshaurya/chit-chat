import React, { Component } from "react";
import { ReactComponent as AddServerSvg } from "../../assets/addServer.svg";
class Servers extends Component {
  render() {
    return (
      <div id="servers">
        <AddServerSvg />
        {/* Show other servers here */}
        <AddServerSvg />
        <AddServerSvg />
        <AddServerSvg />
      </div>
    );
  }
}

export default Servers;
