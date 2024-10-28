import App from "../App";
import SignIn from "./auth/SignIn";
import Register from "./auth/Register";
import Home from "./Home";
import Exam from "./Exam";
import Medicine from "./Medicine";
import Config from "./Config";
import History from "./History";

import { IRouterType } from "../types/router.types";

const pagesData: IRouterType[] = [
  {
    title: "app",
    path: "",
    element: <App />,
  },
  { 
    title: "Sign In", 
    path: "signin", 
    element: <SignIn /> 
  },
  { 
    title: "Register", 
    path: "register", 
    element: <Register /> 
  },
  { 
    title: "Home", 
    path: "home", 
    element: <Home /> 
  },
  { 
    title: "Exam", 
    path: "exam", 
    element: <Exam /> 
  },
  { 
    title: "Medicine",
    path: "medicine",
    element: <Medicine />
  },
  {
    title: "Config",
    path: "config",
    element: <Config />
  },
  {
    title: "History",
    path: "history",
    element: <History />
  }
];

export default pagesData;