import React from "react";
import { Router, Route,  } from "react-router-dom";
import StreamCreate from "./streams/StreamCreate";
import StreamEdit from "./streams/StreamEdit";
import StreamDelete from "./streams/StreamDelete";
import StreamShow from "./streams/StreamShow";
import StreamList from "./streams/StreamList";
import NavBar from "./NavBar";
// Importing the createHistory() method from history.js
import history from '../history'

const App = () => {
  return (
    <div className="ui container">
    {
      // Making our own custom history object only works if we use Router, not BrowserRouter. We then add our createHistory() method which was imported as history as a prop called history
      // on our Router. BrowserRouter will not accept a custom history object, and has it's own history object.
    }
      <Router history={history}>
        <>
          <NavBar />
          <Route path="/" exact component={StreamList} />
          <Route path="/streams/new" component={StreamCreate} />
          <Route path="/streams/edit" component={StreamEdit} />
          <Route path="/streams/delete" component={StreamDelete} />
          <Route path="/streams/show" component={StreamShow} />
        </>
      </Router>
    </div>
  )
};

export default App;
