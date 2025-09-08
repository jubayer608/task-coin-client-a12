import { useNavigate, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

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
    <div>
      <button onClick={handleGoogle} className="btn btn-outline w-full mt-3">
        Continue with Google
      </button>
    </div>
  );
};

export default SocialLogin;
