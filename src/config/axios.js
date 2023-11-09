import axios from "axios";

axios.defaults.withCredentials = true;
// axios.defaults.baseURL = "http://localhost:8080/api/v1/";
axios.defaults.baseURL = "https://node-server-vxgs.onrender.com/api/v1";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

export default axios;
