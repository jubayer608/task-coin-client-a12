import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://task-coin-server.vercel.app`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;