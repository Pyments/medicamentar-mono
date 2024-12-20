import App from "../App";
import SignIn from "./auth/SignIn";
import Register from "./auth/Register";
import Home from "./Home";
import Exam from "./Exam";
import Medicine from "./Medicine";
import Config from "./Config";
import History from "./History";
import Profile from "./Profile";

import { IRouterType } from "../types/router.types";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";

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
    title: "Forgot", 
    path: "forgot-password", 
    element: <ForgotPassword /> 
  },
  { 
    title: "Reset", 
    path: "reset-password", 
    element: <ResetPassword /> 
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
  },
  { 
    title: "Profile",
    path: "profile",
    element: <Profile />
  }
];

export default pagesData;