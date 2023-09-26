import axios from "axios";
import checkToken from "./middleware";


const BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use(checkToken);
export default api;
