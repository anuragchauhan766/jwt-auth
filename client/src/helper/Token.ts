import { httpClient } from "@config/axiosConfig";
import { AuthResponse } from "@src/types/AuthContext";

let ACCESS_TOKEN = "";

export const setAccesstoken = (token: string) => {
  ACCESS_TOKEN = token;
};
export const getAccessToken = () => ACCESS_TOKEN;

export const refreshAccessToken = async () => {
  const response = await httpClient.get<AuthResponse>("/auth/refresh");

  const { accessToken } = response.data;
  return accessToken;
};
