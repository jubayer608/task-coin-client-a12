import { createBrowserRouter } from "react-router";
import RootLayouts from "../layouts/RootLayouts";
import Home from "../pages/Home/Home/Home";
import AuthLayouts from "../layouts/AuthLayouts";
import Login from "../Authentication/Login/Login";
import Register from "../Authentication/Register/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayouts,
    children:[
        {
            index:true,
            Component:Home
        }
    ]
  },
    {
    path: '/',
    Component: AuthLayouts,
    children: [
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      }
    ]
  }
]);