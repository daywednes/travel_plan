import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import { Form, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { UserService } from "../../services/UserService";
import { connect } from "react-redux";
import {SystemAction} from "../../actions/SystemAction"

class SetUserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
          username: "",
          password: "",
          confirm: "",
          error: "",
          loading: false
        };
      }
    
      login = () => {
        let {updateUser} = this.props.system
        let {name, password, username} = updateUser
        if (name === null || name.length === 0) {
            alert("Name should not empty")
            return
        }
        if (password === null || password.length === 0) {
            alert("Password should not empty")
            return
        }
        this.setState({loading: true})
        UserService.setUser(updateUser)
          .then(res => {
            this.setState({loading: false})
            if (res.status === 200) {
              alert(`Successfully update account ${username.toLowerCase()}`)
              this.props.history.push("/user")
            } else if (res.status !== 401) {
              this.setState({ error: res.response.data.message });
            }
          });
      };

      updateUser = (password, name) => {
        let {updateUser} = this.props.system
        if (password !== undefined) {
            updateUser.password = password
        }
        if (name !== undefined) {
            updateUser.name = name
        }
        this.props.setUpdateUser(updateUser)
      }
    
      render() {
        let {updateUser} = this.props.system
        let {loading} = this.state
        return (
          <Grid
            columns={3}
          >
            <Grid columns={1}></Grid>
            <Grid columns={1}>
              <Form>
                <h1>Edit user</h1>
                <Form.Field>
                  <label>Username</label>
                  <input type="text" value={updateUser ? updateUser.username.toLowerCase() : null}
                    disabled={true}
                    onChange={e => {
                      this.setState({ username: e.target.value });
                    }}/>
                </Form.Field>
                <Form.Field>
                  <label>Name</label>
                  <input type="text" value={updateUser ? updateUser.name : null}
                    onChange={e => {
                      this.updateUser(undefined, e.target.value)
                    }}/>
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                  <input type="password" value={updateUser ? updateUser.password : null}
                    onChange={e => {
                        this.updateUser(e.target.value)
                    }}/>
                </Form.Field>
                <font color="red">{this.state.error}</font>
                <br />
                <Link class="ui button" to="/user">Cancel</Link>
                <Button loading={loading} variant="contained" color="blue" onClick={this.login}>
                  Save
                </Button>
              </Form>
            </Grid>
            <Grid columns={1}></Grid>
          </Grid>
        );
      }
}
const mapStateToProps = state => ({
    system: state.system
});
  
const mapDispatchToProps = (dispatch) => ({
    setUpdateUser: (user) => {
        dispatch(SystemAction.setUpdateUser(user));
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(SetUserInfo);