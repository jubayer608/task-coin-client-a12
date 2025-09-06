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
import AddTask from "../pages/Dashboard/AddTask/AddTask";
import MyTasks from "../pages/Dashboard/MyTasks/MyTasks";
import PurchaseCoin from "../pages/Dashboard/PurchaseCoin/PurchaseCoin";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import TaskList from "../pages/Dashboard/TaskList/TaskList";
import TaskDetails from "../pages/Dashboard/TaskDetails/TaskDetails";
import MySubmissions from "../pages/Dashboard/MySubmissions/MySubmissions";
import Withdraw from "../pages/Dashboard/Withdraw/Withdraw";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import ManageTasks from "../pages/Dashboard/ManageTasks/ManageTasks";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayouts,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayouts></DashboardLayouts>
      </PrivateRoute>
    ),
    children: [
      {
        path:'home',
        Component: DashboardHome,
      },
      {
        path: "add-tasks",
        element: <AddTask></AddTask>,
      },
      {
        path: "my-tasks",
        element: <MyTasks></MyTasks>,
      },
      {
        path: "purchase",
        element: <PurchaseCoin></PurchaseCoin>,
      },
      {
        path: "payment-history",
        element: <PaymentHistory></PaymentHistory>,
      },
      //  worker route
      {
        path: "tasklist",
        element: <TaskList></TaskList>,
      },
      {
        path: "tasks/:id",
        element: <TaskDetails />,
      },
      {
        path:"submissions",
        element:<MySubmissions></MySubmissions>
      },
      {
        path:'withdrawals',
        element:<Withdraw></Withdraw>
      },
      // admin routes
      {
        path:"manage-users",
        element:<ManageUsers></ManageUsers>
      },
      {
        path:"manage-task",
        element:<ManageTasks></ManageTasks>
      }
    ],
  },
]);
