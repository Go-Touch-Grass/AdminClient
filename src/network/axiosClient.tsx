import axios from "axios";
import { store } from "@/redux/store";

const getToken = () => {
  const state = store.getState();
  return state.auth.token;
};

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let res = error.response;
    if (res && res.status == 401) {
      // TODO: Handle unauthorised error
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
