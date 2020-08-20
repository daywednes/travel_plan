import React, { Component } from "react";
import { UserService } from "../../services/UserService";
import { Button, Grid, Form } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { SystemAction } from "../../actions/SystemAction";
import { connect } from "react-redux";
import { SettingService } from "../../services/SettingService";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: "",
      loading: false
    };
  }

  login = () => {
    this.setState({loading: true})
    UserService.login(this.state.username, this.state.password)
      .then(res => {
        this.setState({loading: false})
        if (res.status === 200) {
          SettingService.getAll().then(res => {
            if (res.status===200) {
              let settings = res.data
              this.props.setSettings(settings)
              return
            }
            if(res.status!==401) {
              alert("Fail to fetch setting")
            }
          })
          this.props.history.push("/")
        } else if (res.status !== 401) {
          this.setState({ error: res.response.data.message });
        }
      });
  };

  render() {
    let {loading} = this.state
    return (
      <Grid
        columns={3}
      >
        <Grid columns={1}></Grid>
        <Grid columns={1}>
          <Form>
            <h1>Login</h1>
            <Form.Field>
              <label>Username</label>
              <input type="text" value={this.state.username}
                onChange={e => {
                  this.setState({ username: e.target.value });
                }}/>
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input type="password" value={this.state.password}
                onChange={e => {
                  this.setState({ password: e.target.value });
                }}/>
            </Form.Field>
            <font color="red">{this.state.error}</font>
            <br />
            <span>Don't have account? <Link to="/register">Register</Link></span>
            <br/>
            <Button loading={loading} variant="contained" color="blue" onClick={this.login}>
              Login
            </Button>
          </Form>
        </Grid>
        <Grid columns={1}></Grid>
      </Grid>
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
)(LoginPage);
