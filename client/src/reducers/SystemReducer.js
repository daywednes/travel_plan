import * as Type from "../actions/MainActions";
import {PREFER_WORKING_TIME_PER_DAY} from "../actions/SystemAction";

export const system = (
  state = {
    settings: [],
    reportUsername: null,
    updateUser: null,
    workingTimePerDay: 8,
    _workingTimePerDayOfUser : {},
    getWorkingTimePerDay: function(username) {
      if (!username) {
        return this.workingTimePerDay
      }
      return this._workingTimePerDayOfUser[username] || 8
    }
  },
  { type, settings, reportUsername, updateUser, username }
) => {
  switch (type) {
    case Type.SET_SETTINGS:
      state.settings = settings;
      let found = settings.find(setting => setting.property === PREFER_WORKING_TIME_PER_DAY)
      if (found) {
        state.workingTimePerDay = parseInt(found.value);
      }
      return { ...state };
    case Type.SET_REPORT_USERNAME:
      state.reportUsername = reportUsername;
      return { ...state };
    case Type.SET_UPDATE_USER:
      state.updateUser = updateUser;
      return {...state}
    case Type.SET_WORKING_TIME_OF_USER:
      let found1 = settings.find(setting => setting.property === PREFER_WORKING_TIME_PER_DAY)
      if (found1) {
        state._workingTimePerDayOfUser[username] = parseInt(found1.value);
      }
      return {...state}
    case Type.REMOVE_WORKING_TIME_OF_USER:
      delete state._workingTimePerDayOfUser[username]
      return {...state}
    default:
      return { ...state };
  }
};
