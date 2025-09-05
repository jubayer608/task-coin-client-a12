import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useUserRole = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userData = {}, isLoading: roleLoading, refetch } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !authLoading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data; 
      // এখানে API থেকে full user data আসবে -> { role, coins, name, photoURL ... }
    },
  });

  return {
    user, // firebase auth থেকে user
    role: userData.role || "user",
    coins: userData.coin || 0,
    loading: authLoading || roleLoading,
    refetch,
  };
};

export default useUserRole;
