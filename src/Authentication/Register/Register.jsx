import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "../SoicalLogin/SocialLogin";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser, FaImage, FaArrowRight, FaCheck } from "react-icons/fa";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [profilePic, setProfilePic] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  // React Query mutation with axiosSecure
  const registerMutation = useMutation({
    mutationFn: async (userData) => {
      const res = await axiosSecure.post("/users", userData); 
      return res.data;
    },
    onSuccess: (data) => {
      navigate("/dashboard");
    },
    onError: (err) => {
      console.error("Error saving user:", err);
      alert(err.message);
    }
  });

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const result = await createUser(data.email, data.password);

      await updateUserProfile({
        displayName: data.name,
        photoURL: profilePic,
      });
   
      // Trigger mutation
      registerMutation.mutate({
        name: data.name,
        email: data.email,
        photoURL: profilePic,
        role: data.role,
      });

      console.log("Registered User:", result.user);
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);

    try {
      const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
      const res = await axios.post(imagUploadUrl, formData);
      setProfilePic(res.data.data.url);
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Image upload failed. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2"
        >
          Join TaskCoin!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 dark:text-gray-300 text-lg"
        >
          Create your account and start earning
        </motion.p>
      </div>

      {/* Register Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* Full Name Field */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Full Name
          </label>
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              placeholder="Enter your full name"
              className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300"
            />
          </div>
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-red-500 text-sm flex items-center"
            >
              {errors.name.message}
            </motion.p>
          )}
        </div>

        {/* Profile Picture Upload */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Profile Picture
          </label>
          <div className="relative">
            <FaImage className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-secondary"
            />
          </div>
          {profilePic && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center space-x-2 text-green-600 dark:text-green-400 text-sm bg-green-50 dark:bg-green-900/20 p-2 rounded-lg"
            >
              <FaCheck className="text-green-500" />
              <span>Image uploaded successfully!</span>
            </motion.div>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Email Address
          </label>
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              type="email"
              placeholder="Enter your email"
              className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300"
            />
          </div>
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-red-500 text-sm flex items-center"
            >
              {errors.email.message}
            </motion.p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Password
          </label>
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "At least 6 characters" },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[!@#$&*])/,
                  message: "Must include 1 uppercase & 1 special character",
                },
              })}
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              className="w-full pl-12 pr-12 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-red-500 text-sm flex items-center"
            >
              {errors.password.message}
            </motion.p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Confirm Password
          </label>
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              {...register("confirmPassword", { required: "Please confirm your password" })}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className="w-full pl-12 pr-12 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.confirmPassword && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-red-500 text-sm flex items-center"
            >
              {errors.confirmPassword.message}
            </motion.p>
          )}
        </div>

        {/* Role Selection */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Choose Your Role
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="relative">
              <input
                {...register("role", { required: "Please select a role" })}
                type="radio"
                value="worker"
                className="sr-only peer"
              />
              <div className="p-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer peer-checked:border-primary peer-checked:bg-primary/10 transition-all duration-300">
                <div className="text-center">
                  <div className="text-2xl mb-2">👷</div>
                  <div className="font-semibold text-gray-900 dark:text-white">Worker</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Complete tasks and earn</div>
                </div>
              </div>
            </label>
            <label className="relative">
              <input
                {...register("role", { required: "Please select a role" })}
                type="radio"
                value="buyer"
                className="sr-only peer"
              />
              <div className="p-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer peer-checked:border-primary peer-checked:bg-primary/10 transition-all duration-300">
                <div className="text-center">
                  <div className="text-2xl mb-2">💼</div>
                  <div className="font-semibold text-gray-900 dark:text-white">Buyer</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Post tasks and hire workers</div>
                </div>
              </div>
            </label>
          </div>
          {errors.role && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-red-500 text-sm flex items-center"
            >
              {errors.role.message}
            </motion.p>
          )}
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            required
            className="mt-1 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <p className="text-sm text-gray-600 dark:text-gray-300">
            I agree to the{" "}
            <Link to="/terms" className="text-primary hover:text-secondary transition-colors">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-primary hover:text-secondary transition-colors">
              Privacy Policy
            </Link>
          </p>
        </div>

        {/* Register Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={registerMutation.isLoading}
          className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
        >
          {registerMutation.isLoading && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
          {registerMutation.isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <span>Create Account</span>
              <FaArrowRight className="text-sm" />
            </>
          )}
        </motion.button>
      </motion.form>

      {/* Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="relative my-8"
      >
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or continue with</span>
        </div>
      </motion.div>

      {/* Social Login */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <SocialLogin />
      </motion.div>

      {/* Login Link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center mt-8"
      >
        <p className="text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <Link 
            to="/login" 
            className="text-primary hover:text-secondary font-semibold transition-colors"
          >
            Sign In
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Register;