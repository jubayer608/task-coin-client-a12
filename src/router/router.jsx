import { createBrowserRouter } from "react-router";
import RootLayouts from "../layouts/RootLayouts";
import Home from "../pages/Home/Home/Home";
import AuthLayouts from "../layouts/AuthLayouts";
import Login from "../Authentication/Login/Login";
import Register from "../Authentication/Register/Register";
import Profile from "../pages/Profile/Profile";
import PrivateRoute from "../routes/PrivateRoute";
import DashboardLayouts from "../layouts/DashboardLayouts";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";

export const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayouts,
    children:[
        {
            index:true,
            Component:Home
        },
        {
          path:"/profile",
          element:<PrivateRoute><Profile></Profile></PrivateRoute>
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
  },
  {
    path:"/dashboard",
    element:<PrivateRoute><DashboardLayouts></DashboardLayouts></PrivateRoute>,
    children:[
         {
          index:true,
          Component:DashboardHome
         }
    ]
  }
]);