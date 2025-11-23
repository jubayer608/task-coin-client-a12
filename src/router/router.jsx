import { createBrowserRouter } from "react-router";
import RootLayouts from "../layouts/RootLayouts";
import Home from "../pages/Home/Home/Home";
import AllTasks from "../pages/Tasks/AllTasks";
import Blog from "../pages/Blog/Blog";
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
import Forbidden from "../pages/Dashboard/Forbidden/Forbidden";
import ErrorPage from "../components/ErrorPage";
import AdminRoute from "../routes/AdminRoute";
import WorkerRoute from "../routes/WorkerRoute";
import BuyerRoute from "../routes/BuyerRoute";

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
        path: "/tasks",
        Component: AllTasks,
      },
      {
        path: "/blog",
        Component: Blog,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path:"/forbidden",
        Component:Forbidden
      }
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
        element: <BuyerRoute><AddTask></AddTask></BuyerRoute>,
      },
      {
        path: "my-tasks",
        element: <BuyerRoute><MyTasks></MyTasks></BuyerRoute>,
      },
      {
        path: "purchase",
        element: <BuyerRoute><PurchaseCoin></PurchaseCoin></BuyerRoute>,
      },
      {
        path: "payment-history",
        element: <BuyerRoute><PaymentHistory></PaymentHistory></BuyerRoute>,
      },
      //  worker route
      {
        path: "tasklist",
        element: <WorkerRoute><TaskList></TaskList></WorkerRoute>,
      },
      {
        path: "tasks/:id",
        element: <WorkerRoute><TaskDetails /></WorkerRoute>,
      },
      {
        path:"submissions",
        element:<WorkerRoute><MySubmissions></MySubmissions></WorkerRoute>
      },
      {
        path:'withdrawals',
        element:<WorkerRoute><Withdraw></Withdraw></WorkerRoute>
      },
      // admin routes
      {
        path:"manage-users",
        element:<AdminRoute><ManageUsers></ManageUsers></AdminRoute>
      },
      {
        path:"manage-task",
        element:<AdminRoute><ManageTasks></ManageTasks></AdminRoute>
      }
    ],
  },
  {
    path:"/*",
    Component:ErrorPage
  }
]);
