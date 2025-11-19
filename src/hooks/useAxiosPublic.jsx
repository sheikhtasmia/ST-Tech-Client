import axios from "axios";
import { ROOT } from "../constant/motherUrl";

const axiosPublic = axios.create({
  // baseURL:'http://localhost:5000'
  baseURL: ROOT,
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
