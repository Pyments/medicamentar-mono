import App from "../App";
import SignIn from "./auth/SignIn";
import Register from "./auth/Register";

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
    title: "Sign In", 
    path: "register", 
    element: <Register /> 
  },
];

export default pagesData;
