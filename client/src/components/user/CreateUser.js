import React, { Component } from "react";
import { UserService } from "../../services/UserService";
import { Button, Grid, Form } from 'semantic-ui-react'
import { Link } from "react-router-dom";

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirm: "",
      role: "USER",
      error: "",
      loading: false
    };
  }

  login = () => {
    let {username, password, name, confirm, role} = this.state
    if (password!==confirm){
      alert("Confirm password and password is not the same!")
      return
    }
    this.setState({loading: true})
    let response
    if (this.isAdmin()) {
      response = UserService.createUser({
        username: username,
        password: password,
        name: name,
        role: role
      })
    } else {
      response = UserService.register({
        username: username,
        password: password,
        name: name,
      })
    }
    response.then(res => {
        this.setState({loading: false})
        if (res.status === 200) {
          alert(`Successfully create account ${username}`)
          this.props.history.push("/user")
        } else if (res.status !== 401) {
          this.setState({ error: res.response.data.message });
        }
      });
  };

  isAdmin = () => {
    return localStorage.getItem("role") === "ADMIN"
  }

  render() {
    let {loading} = this.state
    return (
      <Grid
        columns={3}
      >
        <Grid columns={1}></Grid>
        <Grid columns={1}>
          <Form>
            <h1>Create user</h1>
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
              <label>Role</label>
              <select value={this.state.role}
                disabled={!this.isAdmin()}
                onChange={e => {
                  this.setState({ role: e.target.value });
                }}>
                <option value="USER">USER</option>
                <option value="MANAGER">MANAGER</option>
              </select>
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
            <Link class="ui button" to="/user">Cancel</Link>
            <Button loading={loading} variant="contained" color="blue" onClick={this.login}>
              Create user
            </Button>
          </Form>
        </Grid>
        <Grid columns={1}></Grid>
      </Grid>
    );
  }
}

export default CreateUser;
