import axios from "axios";
const DEV_BASE_URL = "http://localhost:8080"; // 지은 로컬서버
const PROD_BASE_URL = "http://localhost:808"; // 도커서버

axios.defaults.baseURL = DEV_BASE_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

export default axios;
