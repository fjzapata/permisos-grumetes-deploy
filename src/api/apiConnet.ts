import axios from "axios";


const api = axios.create({
  baseURL: "http://18.216.111.120:3000",
  withCredentials: true
});


export default api
