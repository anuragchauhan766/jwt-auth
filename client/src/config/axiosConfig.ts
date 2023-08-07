import {
  getAccessToken,
  refreshAccessToken,
  setAccesstoken,
} from "@src/helper/Token";
import { AuthResponse } from "@src/types/AuthContext";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
const authHttpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

authHttpClient.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    let accessToken = getAccessToken();

    if (!accessToken) {
      accessToken = (await refreshAccessToken()) as string;
      setAccesstoken(accessToken);
    }
    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

authHttpClient.interceptors.response.use(
  (res) => res,
  async (error: AxiosError<AuthResponse>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig;
    if (
      error.response?.status === 401 &&
      error.response.data.error?.name === "TokenExpiredError"
    ) {
      const accessToken = (await refreshAccessToken()) as string;
      setAccesstoken(accessToken);

      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return authHttpClient.request(originalRequest);
    }
    return Promise.reject(error);
  }
);

export { httpClient, authHttpClient };
