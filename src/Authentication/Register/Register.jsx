import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";

import axios from "axios";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "../SoicalLogin/SocialLogin";


const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const result = await createUser(data.email, data.password);

      await updateUserProfile({
        displayName: data.name,
        photoURL: data.photoURL,
      });

      // send user to backend for role + coin
      await axios.post("http://localhost:5000/api/auth/init", {
        name: data.name,
        email: data.email,
        photoURL: data.photoURL,
        role: data.role,
      });

      console.log("Registered User:", result.user);
      navigate("/dashboard");
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-base-200 p-6 rounded-lg shadow mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input
          {...register("name", { required: "Name is required" })}
          placeholder="Full Name"
          className="input input-bordered w-full"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <input
          {...register("photoURL")}
          placeholder="Profile Picture URL"
          className="input input-bordered w-full"
        />

        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/,
              message: "Invalid email format",
            },
          })}
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "At least 6 characters" },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*[!@#$&*])/,
              message: "Must include 1 uppercase & 1 special character",
            },
          })}
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <select {...register("role")} className="select select-bordered w-full">
          <option value="worker">Worker</option>
          <option value="buyer">Buyer</option>
        </select>

        <button type="submit" className="btn btn-primary w-full">
          Register
        </button>
      </form>

      {/* Social Login */}
      <SocialLogin />

      <p className="mt-3 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-primary">Login</Link>
      </p>
    </div>
  );
};

export default Register;
