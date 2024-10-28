import { Route, Routes } from "react-router-dom";
import { IRouterType } from "../types/router.types";
import pagesData from "./pagesData";
import { ProtectedRoute } from "../hooks/ProtectedRoute";

const Router = () => {
  const publicRoutes = ['signin', 'register', 'forgot-password', 'reset-password'];
  const pageRoutes = pagesData.map(({ path, title, element }: IRouterType) => {
    const isPublicRoute = publicRoutes.includes(path);

    return (
      <Route
        key={title}
        path={`/${path}`}
        element={
          isPublicRoute ? (
            element 
          ) : (
            <ProtectedRoute>
              {element}
            </ProtectedRoute>
          )
        }
      />
    );
  });


  return <Routes>{pageRoutes}</Routes>;
};

export default Router;
