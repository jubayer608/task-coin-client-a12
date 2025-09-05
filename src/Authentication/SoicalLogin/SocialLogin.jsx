
import { useNavigate, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";

const SocialLogin = () => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const handleGoogle = async () => {
    try {
      const result = await signInWithGoogle();
      console.log("Google User:", result.user);

      // এখানে চাইলে backend এ user info পাঠাতে পারো default worker role সহ
      // await axios.post("http://localhost:5000/api/auth/init", {
      //   name: result.user.displayName,
      //   email: result.user.email,
      //   photoURL: result.user.photoURL,
      //   role: "worker",
      // });

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
