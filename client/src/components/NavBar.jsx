import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from './GoogleAuth'

const NavBar = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        Streamer
      </Link>
      <div className="right menu">
        <Link className="item" to="/">
          All Streams
        </Link>
        {// Google Auth component is the button that gives us the functionality to log into google and keep track if the user is logged in or not.
        }
        <GoogleAuth/>
      </div>
    </div>
  );
};

export default NavBar;
