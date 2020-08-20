import React from "react";
import Timesheet from "../components/timesheet/Timesheet";
import Setting from "../components/setting/Setting"
import User from "../components/user/User";
import CreateUser from "../components/user/CreateUser";
import SetUserInfo from "../components/user/SetUserInfo";

export const ROUTERS = [
  {
    path: "/",
    component: (props) => <Timesheet {...props} />,
  },
  {
    path: "/timesheet",
    component: (props) => <Timesheet {...props} />,
  },
  {
    path: "/setting",
    component: (props) => <Setting {...props} />,
  },
  {
    path: "/user",
    component: (props) => <User {...props}/>
  },
  {
    path: "/create-user",
    component: (props) => <CreateUser {...props}/>
  },
  {
    path: "/edit-user",
    component: (props) => <SetUserInfo {...props}/>
  }
];
