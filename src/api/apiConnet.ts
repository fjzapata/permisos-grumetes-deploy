import axios from "axios";


const api = axios.create({
  baseURL: "http://ec2-3-14-16-75.us-east-2.compute.amazonaws.com:3000/",
  withCredentials: true
});


export default api
