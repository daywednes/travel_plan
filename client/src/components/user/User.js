import React, { Component } from "react";
import { UserService } from "../../services/UserService";
import { Table, TableHeader, TableBody, Button } from "semantic-ui-react";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import Timesheet from "../timesheet/Timesheet";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { SystemAction } from "../../actions/SystemAction";

class User extends Component {
    constructor(props) {
        super(props)
        this.state={
            users:[],
            open: false,
            username: null
        }
    }

    componentDidMount() {
        this.getAll()
    }

    getAll = () => {
      this.setState({users: []})
        UserService.getAll().then(res=>{
            if (res.status===200){
                let data = res.data
                data.sort((a, b) => {
                  return (a.username > b.username) ? 1 : ((a.username < b.username) ? -1 : 0)
                })
                this.setState({users: data})
                return
            }
            if (res.status!==401){
                alert("ERROR")
            }
        })
    }

    setStatus = (username, disable = true) => {
        if (!window.confirm("Are you sure")) {
            return
        }
        let response
        if (disable) {
            response = UserService.disable(username)
        } else {
            response = UserService.enable(username)
        }
        response.then(res => {
            if (res.status===200){
                this.getAll()
                alert("Success")
                return
            }
            if(res.status!==401){
                alert("ERROR")
            }
        })
    }

    openTimesheet = (username) => {
        this.setState({
            open: true,
            username: username
        })
    }

    editUser = (user) => {
      let clone = {...user}
      this.props.setUpdateUser(clone)
    }

    onClosePopup = () => {
      let {username} = this.state
      this.props.removeWorkingTimeOfUser(username)
      this.setState({ open: false });
    }

    render() {
        let {open, username} = this.state
        return (
          <div style={{ marginLeft: "20%" }}>
            <Link className="ui primary button" style={{marginLeft: "60%"}} to="/create-user">Create User</Link>
            <Table style={{minWidth: "400px"}}>
              <TableHeader>
                <tr>
                <th>Username</th>
                <th>Name</th>
                <th>Role</th>
                <th>Action</th>
                </tr>
              </TableHeader>
              <TableBody>
                {this.state.users.map((user, i) => (
                  <tr key={user.username || i}>
                    <td>{user.username.toLowerCase()}</td>
                    <td>{user.name}</td>
                    <td>{user.role}</td>
                    <td>
                      <Button
                        className={user.status === 1 ? "" : "primary"}
                        onClick={() => {
                          this.setStatus(user.username, user.status === 1);
                        }}
                      >
                        {user.status === 1 ? "Disable" : "Enable"}
                      </Button>
                      <Link className="ui primary button" to="/edit-user"
                        onClick={() => {
                          this.editUser(user)
                        }}>Edit</Link>
                      {UserService.isRole("ADMIN") ? (
                        <Button
                          onClick={() => {
                            this.openTimesheet(user.username);
                          }}
                        >
                          View timesheet
                        </Button>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </TableBody>
            </Table>
            <Dialog
              className="formDialog"
              open={open}
              onClose={this.onClosePopup}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Log works</DialogTitle>
              <DialogContent
                style={{ minHeight: "400px", overflowY: "scroll" }}
              >
                {open ? <Timesheet username={username}></Timesheet> : null}
              </DialogContent>
            </Dialog>
          </div>
        );
    }
}
const mapStateToProps = state => ({
  system: state.system
});

const mapDispatchToProps = (dispatch) => ({
  setUpdateUser: (user) => {
      dispatch(SystemAction.setUpdateUser(user));
  },
  removeWorkingTimeOfUser: (username) => {
    dispatch(SystemAction.removeWorkingTimeOfUser(username))
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(User)