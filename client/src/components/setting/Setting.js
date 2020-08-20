import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { SystemAction, PREFER_WORKING_TIME_PER_DAY } from '../../actions/SystemAction'
import { SettingService } from '../../services/SettingService'

class Setting extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            workingTimePerDay: 8,
            loading: false
        }
    }
    
    componentDidMount() {
        this.setState({loading: true})
        SettingService.getAll().then((res) => {
            this.setState({loading: false})
          if (res.status === 200) {
            let settings = res.data;
            let found = settings.find(setting => setting.property === PREFER_WORKING_TIME_PER_DAY)
            if (found) {
                this.setState({
                    workingTimePerDay: parseInt(found.value)
                })
            }
            return;
          }
          if (res.status !== 401) {
              alert("Error")
          }
        });        
    }

    saveSetting = () => {
        this.setState({loading: true})
        SettingService.saveSetting([{
            property: PREFER_WORKING_TIME_PER_DAY,
            value: this.state.workingTimePerDay + ""
        }]).then(res => {
            if (res.status===200){
                SettingService.getAll().then(res => {
                    this.setState({loading: false})
                    if (res.status===200){
                        let settings = res.data
                        this.props.setSettings(settings)
                    }
                })
                alert("Success")
                return
            }
            if (res.status!==401){
                alert("Error")
            }
        })
    }

    render() {
        let {loading} = this.state
        return <div style={{marginLeft: "30%"}}>
            <Form>
                <Form.Field>
                    <label>Prefer working time per day</label>
                    <input type="number" min={0} max={24}
                        value={this.state.workingTimePerDay}
                        onChange={(e) => {
                            let value = e.target.value ? parseInt(e.target.value) : 0
                            this.setState({workingTimePerDay: value})
                        }}/>
                </Form.Field>
                <Form.Field>
                    <Button loading={loading} className="primary" onClick={this.saveSetting}>Save</Button>
                </Form.Field>
            </Form>
        </div>
    }
}

const mapStateToProps = state => ({
    system: state.system
  });
  
const mapDispatchToProps = (dispatch) => ({
  setSettings: (settings) => {
    dispatch(SystemAction.setSettings(settings));
  },
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Setting)