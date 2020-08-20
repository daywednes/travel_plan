import { AuthRequest, handleCommonError } from "../utils/Request";

export const TimesheetService = {
  getByRange: (firstDate, lastDate) => {
    firstDate.setUTCHours(0,0,0,0);
    lastDate.setUTCHours(23,59,59,999);
    let param1 = firstDate.getTime()
    let param2 = lastDate.getTime()
    return AuthRequest.get(`/api/timesheet/getByRange?from=${param1}&to=${param2}`).catch(handleCommonError);
  },
  getByUsernameAndRange: (username, firstDate, lastDate) => {
    firstDate.setUTCHours(0,0,0,0);
    lastDate.setUTCHours(23,59,59,999);
    let param1 = firstDate.getTime()
    let param2 = lastDate.getTime()
    return AuthRequest.get(`/api/timesheet/getByUsernameAndRange?username=${username}&from=${param1}&to=${param2}`).catch(handleCommonError);
  },
  addTimeSheet: (timesheets, deleteTimesheets) => {
    let data = timesheets.map(row => ({
      ...row,
      times: row.times.filter(time => time.hour > 0)
    }))
    return AuthRequest.post('/api/timesheet', {
      saveList: data,
      deleteList: deleteTimesheets
    }).catch(handleCommonError)
  },
  addTimeSheetForUser: (username, timesheets, deleteTimesheets) => {
    let data = timesheets.map(row => ({
      ...row,
      times: row.times.filter(time => time.hour > 0)
    }))
    return AuthRequest.post('/api/timesheet/addForUser', {
      saveList: data,
      deleteList: deleteTimesheets,
      username: username
    }).catch(handleCommonError)
  }
};
