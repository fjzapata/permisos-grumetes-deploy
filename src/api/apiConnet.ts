import axios, { AxiosRequestConfig } from "axios";
import { useAuthStore } from "../store/authStore";

const api = axios.create({
  baseURL: "https://node-deployment-production.up.railway.app/",
  withCredentials: true
});


export default api
