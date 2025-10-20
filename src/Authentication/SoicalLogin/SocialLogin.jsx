import { useNavigate, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";

const SocialLogin = () => {
  const { signInWithGoogle } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const handleGoogle = async () => {
    try {
      const result = await signInWithGoogle();
      // console.log("Google User:", result.user);

      
      const defaultRole = "buyer"; 

      
      const defaultCoin = defaultRole === "buyer" ? 50 : 10;

      const saveUser = {
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        role: defaultRole,
        coin: defaultCoin,
        createdAt: new Date(),
      };

      await axiosSecure.post("/users", saveUser);

      navigate(from, { replace: true });
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleGoogle}
      className="w-full bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-4 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-3"
    >
      <FaGoogle className="text-red-500 text-xl" />
      <span>Continue with Google</span>
    </motion.button>
  );
};

export default SocialLogin;
