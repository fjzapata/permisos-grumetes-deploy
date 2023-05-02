import axios from "axios";


const api = axios.create({
  baseURL: "https://navalapp.ddns.net/",
  withCredentials: true
});


export default api
