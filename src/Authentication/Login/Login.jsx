import { useForm } from "react-hook-form";
import { useNavigate, useLocation, Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "../SoicalLogin/SocialLogin";


const Login = () => {
  const { signIn } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const onSubmit = async (data) => {
    try {
      await signIn(data.email, data.password);
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error.message);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-base-200 p-6 rounded-lg shadow mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input
          {...register("email", { required: "Email is required" })}
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input
          {...register("password", { required: "Password is required" })}
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <button type="submit" className="btn btn-primary w-full">
          Login
        </button>
      </form>

      {/* Social Login */}
      <SocialLogin />

      <p className="mt-3 text-center">
        Don’t have an account?{" "}
        <Link to="/register" className="text-primary">Register</Link>
      </p>
    </div>
  );
};

export default Login;
