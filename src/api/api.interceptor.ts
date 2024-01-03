import { API_URL } from "@/src/config/api.config";
import axios from "axios";
import Cookies from "js-cookie";
import { errorCatch, getContentType } from "./api.helper";
import {toast} from "react-toastify";

export const axiosClassic = axios.create({
  baseURL: API_URL,
  headers: getContentType(),
});

export const axiosAuth = axios.create({
  baseURL: API_URL,
  headers: getContentType(),
});

axiosAuth.interceptors.request.use((config) => {
  const accessToken = Cookies.get("accessToken");

  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosAuth.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;

      try {
        // await AuthService.getNewTokens();

        // return axiosAuth.request(originalRequest);
      } catch (error) {
        if (errorCatch(error) === "Invalid refresh token") {
            // await AuthService.logout();

            await toast.error("Время сессии истекло. Пожалуйста, войдите снова.");
        }
      }
    }

    throw error;
  }
);

export default axiosAuth;
