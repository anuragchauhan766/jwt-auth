import axios from "axios";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export { httpClient };
