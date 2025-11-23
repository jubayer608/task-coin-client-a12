import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "../SoicalLogin/SocialLogin";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaCloudUploadAlt, FaUser, FaEnvelope, FaLock, FaUserTag, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [profilePic, setProfilePic] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [isUploading, setIsUploading] = useState(false);
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

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(image);

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', image);

    try {
      const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
      const res = await axios.post(imagUploadUrl, formData);
      setProfilePic(res.data.data.url);
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-100 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl w-full"
      >
        {/* Card Container */}
        <div className="bg-base-100 rounded-3xl shadow-2xl overflow-hidden border border-base-300">
          {/* Header Section with Gradient */}
          <div className="bg-gradient-to-r from-primary via-secondary to-accent p-6 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
            </div>
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-white/30"
              >
                <FaUser className="text-3xl text-white" />
              </motion.div>
              <h2 className="text-2xl font-extrabold mb-1">Create Account</h2>
              <p className="text-white/90 text-sm">Join TaskCoin and start earning today</p>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-semibold text-base-content mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaUser className="text-base-content/50" />
                  </div>
                  <input
                    {...register("name", { required: "Name is required" })}
                    placeholder="Enter your full name"
                    className="input input-bordered w-full bg-base-100 text-base-content pl-12 border-base-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                {errors.name && (
                  <p className="text-error text-sm mt-1 flex items-center gap-1">
                    <span>⚠</span> {errors.name.message}
                  </p>
                )}
              </div>

              {/* Profile Picture Upload */}
              <div>
                <label className="block text-sm font-semibold text-base-content mb-2">
                  Profile Picture
                </label>
                <div className="space-y-2">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-primary/50 rounded-xl cursor-pointer bg-base-200 hover:bg-base-300 transition-all duration-300 group relative overflow-hidden">
                    {imagePreview ? (
                      <div className="relative w-full h-full">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <FaCloudUploadAlt className="text-white text-2xl" />
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-6 pb-6">
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <FaCloudUploadAlt className="w-12 h-12 mb-3 text-primary" />
                        </motion.div>
                        <p className="mb-2 text-sm font-semibold text-base-content">
                          <span className="text-primary">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-base-content/50">PNG, JPG or GIF (MAX. 5MB)</p>
                      </div>
                    )}
                    <input
                      {...register("photoURL")}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={isUploading}
                    />
                  </label>
                  {isUploading && (
                    <div className="flex items-center gap-2 text-primary text-sm">
                      <span className="loading loading-spinner loading-sm"></span>
                      <span>Uploading image...</span>
                    </div>
                  )}
                  {profilePic && !isUploading && (
                    <div className="flex items-center gap-2 text-success text-sm">
                      <FaCheckCircle />
                      <span>Image uploaded successfully</span>
                    </div>
                  )}
                  {imagePreview && (
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview('');
                        setProfilePic('');
                      }}
                      className="btn btn-sm btn-error w-full"
                    >
                      Remove Image
                    </button>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-base-content mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaEnvelope className="text-base-content/50" />
                  </div>
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
                    className="input input-bordered w-full bg-base-100 text-base-content pl-12 border-base-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                {errors.email && (
                  <p className="text-error text-sm mt-1 flex items-center gap-1">
                    <span>⚠</span> {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-base-content mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaLock className="text-base-content/50" />
                  </div>
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
                    className="input input-bordered w-full bg-base-100 text-base-content pl-12 pr-12 border-base-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/60 hover:text-primary transition-colors p-1"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-error text-sm mt-1 flex items-center gap-1">
                    <span>⚠</span> {errors.password.message}
                  </p>
                )}
                <div className="mt-1 text-xs text-base-content/60">
                  <p className="mb-1">Password must contain:</p>
                  <ul className="list-disc list-inside ml-2 space-y-0.5">
                    <li>At least 6 characters</li>
                    <li>One uppercase letter</li>
                    <li>One special character (!@#$&*)</li>
                  </ul>
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-semibold text-base-content mb-2">
                  I want to join as
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaUserTag className="text-base-content/50" />
                  </div>
                  <select
                    {...register("role")}
                    className="select select-bordered w-full bg-base-100 text-base-content pl-12 border-base-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  >
                    <option value="worker">Worker - Complete tasks and earn</option>
                    <option value="buyer">Buyer - Post tasks and hire workers</option>
                  </select>
                </div>
              </div>

              {/* Terms and Conditions */}
              <label className="flex items-start cursor-pointer gap-3">
                <input type="checkbox" className="checkbox checkbox-primary checkbox-sm mt-1" required />
                <span className="text-sm text-base-content/70">
                  I agree to the{" "}
                  <Link to="/terms" className="text-primary hover:text-secondary">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-primary hover:text-secondary">
                    Privacy Policy
                  </Link>
                </span>
              </label>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={registerMutation.isLoading}
                className="w-full bg-gradient-to-r from-primary via-secondary to-accent text-white font-bold py-4 rounded-xl hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {registerMutation.isLoading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <FaCheckCircle />
                  </>
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-base-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-base-100 text-base-content/60">Or sign up with</span>
              </div>
            </div>

            {/* Social Login */}
            <SocialLogin />

            {/* Login Link */}
            <p className="mt-4 text-center text-base-content/70 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-semibold hover:text-secondary transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-center text-xs text-base-content/60"
        >
          Join thousands of users already earning on TaskCoin
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Register;
