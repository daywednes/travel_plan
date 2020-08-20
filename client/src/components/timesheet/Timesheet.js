import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { SystemAction } from "../../actions/SystemAction";

class TimeSheet extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <Grid columns={16}>
        <h2>Hello world</h2>
      </Grid>
    );
  }
}
const mapStateToProps = state => ({
  system: state.system
});

const mapDispatchToProps = (dispatch) => ({
  setWorkingTimeOfUser: (username, settings) => {
    dispatch(SystemAction.setWorkingTimeOfUser(username, settings));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(TimeSheet);
