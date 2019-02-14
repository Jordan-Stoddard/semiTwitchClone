import React from "react";
import {connect} from 'react-redux'
import {signIn, signOut} from '../actions'

// This components job is to 1) determine if user is signed in using google oauth using Google's front end JS library, 2) render buttons for either sign in or sign out 3) add click events on buttons that

class GoogleAuth extends React.Component {
  componentDidMount() {
    // gapi === google api
    // window.gapi becomes available because we've made a script tag in index.html that references the google api.
    //.load is a method on the gapi, first param is a string with the library you want to load, second param is a callback function that returns a promise.
    window.gapi.load("client:auth2", () => {
      // client.init takes in an object with two properties: clientId and the scope. In this case we're getting the email scope.
      window.gapi.client
        .init({
          clientId:
            "338139004060-feivv4ccl5sgsm53jf3qp8qu6fv0nhk0.apps.googleusercontent.com",
          scope: "email"
        })
        // .then executes after the promise returns from the google api, takes in an anonymous function.
        .then(() => {
          // this.auth gets the instance of the current user
          this.auth = window.gapi.auth2.getAuthInstance();
          // calls onAuthchange and passes in the isSignedIn.get method to get a true or false value
          this.onAuthChange(this.auth.isSignedIn.get())
          // isSignedIn.listen is like an event listener that listens for if the isSignedIn property on the user object has changed.
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  // Method that calls action creators depending on what the state of isSignedIn coming from our redux store is..
  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      // If isSigned in is false or null, we call the .signIn action creator and pass in the currentUser's id
      this.props.signIn(this.auth.currentUser.get().getId())
    } else {
      // if isSignedIn is true, call the signOut action creator.
      this.props.signOut()
    }
  }

  // Method that triggers the signIn method on our current auth instance.
  clickToSignIn = () => {
    return this.auth.signIn();
  };

   // Method that triggers the signOut method on our current auth instance.
  clickToSignOut = () => {
    return this.auth.signOut();
  };

  // Conditional render of button depending on the state of isSignedIn coming from our redux store.
  renderAuthButton = () => {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.clickToSignOut} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.clickToSignIn} className="ui green google button">
          <i className="google icon" />
          Google Sign In
        </button>
      );
    }
  };

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

// passes our store's current state of isSignedIn into this component.
const mapStateToProps = (state) => {
  return {isSignedIn: state.auth.isSignedIn}
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);
