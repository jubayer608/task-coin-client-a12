// components/Loading.jsx
import { FaUserCog, FaUserTie, FaUsers } from "react-icons/fa";
import useUserRole from "../hooks/useUserRole";


const Loading = () => {
  const [role, isRoleLoading] = useUserRole();


  const roleConfig = {
    worker: {
      icon: <FaUserCog />,
      message: "Hang tight! We're loading your Worker Dashboard...",
      sub: "Managing your assigned tasks and coin details.",
    },
    buyer: {
      icon: <FaUserTie />,
      message: "Hang tight! We're loading your Buyer Dashboard...",
      sub: "Fetching your task orders and payment details.",
    },
    admin: {
      icon: <FaUsers />,
      message: "Hang tight! We're loading your Admin Dashboard...",
      sub: "Preparing system analytics and user management tools.",
    },
  };

  const { icon, message, sub } = roleConfig[role] || {
    icon: <FaUsers />,
    message: "Hang tight! We're loading your Dashboard...",
    sub: "Please wait while we prepare everything for you.",
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-base-100 text-center px-4">
      {/* Animated role-based icon */}
      <div className="animate-bounce text-primary text-6xl mb-4">
        {icon}
      </div>

      {/* Main message */}
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
        {message}
      </h2>

      {/* Sub message */}
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mt-2">
        {sub}
      </p>

      {/* DaisyUI spinner */}
      <span className="loading loading-spinner loading-lg text-primary mt-6"></span>
    </div>
  );
};

export default Loading;
