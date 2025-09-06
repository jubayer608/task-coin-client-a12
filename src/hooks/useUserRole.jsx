import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [coins, setCoins] = useState(0);

  const { data: userData = {}, isLoading: roleLoading, refetch } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !authLoading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      setCoins(res.data.coin || 0); // state update
      return res.data;
    },
  });

  return {
    user,
    role: userData.role || "user",
    coins,
    setCoins, 
    loading: authLoading || roleLoading,
    refetch,
  };
};

export default useUserRole;
