import axios from "axios";
import React from "react";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  // Create axios instance
  const axiosSecure = axios.create({
    baseURL: `https://task-coin-server.vercel.app`,
  });

  // Request interceptor to attach JWT
  axiosSecure.interceptors.request.use(
    async (config) => {
      if (user) {
        try {
          const token = await user.getIdToken(); // Firebase JWT
          config.headers.Authorization = `Bearer ${token}`;
        } catch (err) {
          console.error("Failed to get token:", err);
        }
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor to handle 401/403
  axiosSecure.interceptors.response.use(
    (res) => res,
    async (error) => {
      const status = error.response?.status;

      if (status === 403) {
        navigate("/forbidden");
      } else if (status === 401) {
        await logOut().catch(() => {});
        navigate("/login");
      }

      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
