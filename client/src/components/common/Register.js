import React, { Component } from "react";
import { UserService } from "../../services/UserService";
import { Button, Grid, Form } from 'semantic-ui-react'

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirm: "",
      error: ""
    };
  }

  login = () => {
    let {username, password, name, confirm} = this.state
    if (password!==confirm){
      alert("Confirm password and password is not the same!")
      return
    }
    UserService.register({
      username: username,
      password: password,
      name: name,
    })
      .then(res => {
        if (res.status === 200) {
          alert(`Successfully create account ${username}`)
          this.props.history.push("/login")
        } else if (res.status !== 401) {
          this.setState({ error: res.response.data.message });
        }
      });
  };

  render() {
    if (UserService.isLoggedIn()) {
      this.props.history.push("/")
      return null;
    }
    return (
      <Grid
        columns={3}
      >
        <Grid columns={1}></Grid>
        <Grid columns={1}>
          <Form>
            <h1>Register</h1>
            <Form.Field>
              <label>Username</label>
              <input type="text" value={this.state.username}
                onChange={e => {
                  this.setState({ username: e.target.value });
                }}/>
            </Form.Field>
            <Form.Field>
              <label>Name</label>
              <input type="text" value={this.state.name}
                onChange={e => {
                  this.setState({ name: e.target.value });
                }}/>
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input type="password" value={this.state.password}
                onChange={e => {
                  this.setState({ password: e.target.value });
                }}/>
            </Form.Field>
            <Form.Field>
              <label>Confirm password</label>
              <input type="password" value={this.state.confirm}
                onChange={e => {
                  this.setState({ confirm: e.target.value });
                }}/>
            </Form.Field>
            <font color="red">{this.state.error}</font>
            <br />
            <Button variant="contained" color="blue" onClick={this.login}>
              Register
            </Button>
          </Form>
        </Grid>
        <Grid columns={1}></Grid>
      </Grid>
    );
  }
}

export default Register;
