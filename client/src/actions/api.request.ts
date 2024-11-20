import axios from "axios";
import { HOST } from "@/actions/api.route";
import { refreshToken } from "./auth.api";

export const requestClient = axios.create({
  baseURL: HOST,
  timeout: 20000,
  withCredentials: true,
});

let isRefreshToken = false;
let requestsToRefresh: ((token: string | null) => void)[] = [];

requestClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error;
    const status = response?.status;

    if (status === 401) {
      const token = localStorage.getItem("token");
      if (!token) return Promise.reject(error);

      if (!isRefreshToken) {
        isRefreshToken = true;
        try {
          const { accessToken } = await refreshToken();
          localStorage.setItem("token", JSON.stringify(accessToken));

          config.headers["Authorization"] = `Bearer ${accessToken}`;
          return requestClient(config);
        } catch (err) {
          localStorage.clear();
          window.location.href = "/sign-in";
          return Promise.reject(err);
        } finally {
          isRefreshToken = false;
          requestsToRefresh = [];
        }
      }
    }

    return Promise.reject(error);
  }
);
