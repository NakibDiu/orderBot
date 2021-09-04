import axios from "axios";
import { getValueFromLocalStorage } from "../customHooks/useLocalState";
import url from "../url";

const headers = {
  Accept: "application/json",
};

const axiosInstance = axios.create({
  baseURL: url,
  headers: headers,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const user = getValueFromLocalStorage("user");

    if (user && user.access_token) {
      config.headers.Authorization = `Bearer ${user.access_token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
