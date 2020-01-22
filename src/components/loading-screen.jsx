import React from "react";
import "./loading-screen.styles.css";
import { ReactComponent as LoadingIcon } from "../../assets/loadingicon.svg";
const LoadingScreen = props => {
  return (
    <div className="loading-screen">
      <div>
        <LoadingIcon />
      </div>
      <div className="status">{props.text}</div>
    </div>
  );
};

export default LoadingScreen;
