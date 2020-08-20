import * as Type from "./MainActions";

export const SystemAction = {
  setSettings: settings => ({
    type: Type.SET_SETTINGS,
    settings
  }),
  setReportUsername: reportUsername => ({
    type: Type.SET_REPORT_USERNAME,
    reportUsername
  }),
  setUpdateUser: updateUser => ({
    type: Type.SET_UPDATE_USER,
    updateUser
  }),
  setWorkingTimeOfUser: (username, settings) => ({
    type: Type.SET_WORKING_TIME_OF_USER,
    username,
    settings
  }),
  removeWorkingTimeOfUser: (username) => ({
    type: Type.REMOVE_WORKING_TIME_OF_USER,
    username
  })
};

export const PREFER_WORKING_TIME_PER_DAY = "PreferWorkingTimePerDay"
