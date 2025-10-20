import { useEffect } from "react";
import { useLocation } from "react-router";

const routeTitles = {
  "/": "Home | TaskCoin",
  "/login": "Login | TaskCoin",
  "/register": "Register | TaskCoin",
  "/profile": "Profile | TaskCoin",
  "/tasks": "All Tasks | TaskCoin",
  // Dashboard main
  "/dashboard/home": "Home | TaskCoin",
  "/dashboard/add-tasks": "Add Task | TaskCoin",
  "/dashboard/my-tasks": "My Tasks | TaskCoin",
  "/dashboard/purchase": "Purchase Coin | TaskCoin",
  "/dashboard/payment-history": "Payment History | TaskCoin",
  "/dashboard/tasklist": "Task List | TaskCoin",
  "/dashboard/submissions": "My Submissions | TaskCoin",
  "/dashboard/withdrawals": "Withdraw | TaskCoin",
  "/dashboard/manage-users": "Manage Users | TaskCoin",
  "/dashboard/manage-task": "Manage Tasks | TaskCoin",
};

// Dynamic route patterns
const dynamicRoutes = [
  { pathStart: "/dashboard/tasks", title: "Task Details | TaskCoin" },
  { pathStart: "/dashboard/update-task/", title: "Update Task | TaskCoin" },
];

const TitleManager = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    let title = routeTitles[pathname];

    if (!title) {
      const dynamic = dynamicRoutes.find((r) => pathname.startsWith(r.pathStart));
      title = dynamic ? dynamic.title : "404 Not Found | TaskCoin";
    }

    document.title = title;
  }, [pathname]);

  return null;
};

export default TitleManager;
