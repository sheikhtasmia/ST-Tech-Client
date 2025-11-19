import axios from "axios";
import { ROOT } from "../constant/motherUrl";

const axiosPrivate = axios.create({
  baseURL: ROOT, // Make sure this matches your backend
  withCredentials: false,
});

axiosPrivate.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access-token"); // optional
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const useAxiosPrivate = () => axiosPrivate;

export default useAxiosPrivate;
