import React, { Component } from "react";
import "./App.css";
import { UserService } from "./services/UserService";
import LoginPage from "./components/common/LoginPage";
import { Container } from "@material-ui/core";
import MyAppBar from "./components/common/MyAppBar";

import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ROUTERS } from "./utils/Routers";
import Register from "./components/common/Register";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { SettingService } from "./services/SettingService";
import {SystemAction} from "./actions/SystemAction"

class App extends Component {
  render() {
    var url = window.location.href;
    var lastPart = url.substr(url.lastIndexOf('/') + 1);
    if (lastPart !== "login" && !UserService.isLoggedIn()) {
      window.location.href = "/login";
      return null;
    } else if (lastPart === "login" && UserService.isLoggedIn()) {
      window.location.href = "/";
      return null;
    }
    return (
      <Router>
        <Switch>
          <Route exact={true} path="/login" component={({history}) => <LoginPage history={history} />} />
          <Route exact={true} path="/register" component={({history}) => <Register history={history} />} />
          <MyAppBar>
            <Container style={{
              paddingLeft: '0px',
              paddingRight: '0px'
            }}>
              <Grid>
                {ROUTERS.map((r, index) => 
                  <Route
                    key={index}
                    exact={true}
                    path={r.path}
                    render={r.component}
                  />
                )}
                {/* <Route path="/not-found" component={() => <NotFoundPage/>} />
                <Redirect to="not-found" /> */}
              </Grid>
            </Container>
          </MyAppBar>
        </Switch>
      </Router>
    );
  }
}
const mapStateToProps = state => ({
  products: state.settings
});

const mapDispatchToProps = dispatch => ({
  setSettings: settings => {
    dispatch(SystemAction.setSettings(settings));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
