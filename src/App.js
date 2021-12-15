import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import land from "./Pages/landingPage";



class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={land}></Route>
        </Switch>
      </div>
    );
  }
}
export default withRouter(App);