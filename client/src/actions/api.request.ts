import axios from "axios";
// import axiosRetry from 'axios-retry';
import { HOST } from "@/actions/api.route";
import { getToken } from "@/lib/utils";
import { refreshToken } from "./auth.api";

export const requestClient = axios.create({
  baseURL: HOST,
  timeout: 20000,
  withCredentials: true,
});

// axiosRetry(requestClient, {
//   retries: 3,
//   retryCondition: (error) => error.response?.status === 401,
//   retryDelay: (retryCount, error) => retryCount * 1000,
// });

// requestClient.interceptors.response.use(
//   async (response) => {
//     const { config, data } = response;
//     if (
//       config.url?.indexOf("login")! >= 0 ||
//       config.url?.indexOf("register")! >= 0 ||
//       config.url?.indexOf("refresh")! >= 0
//     ) {
//       return response;
//     }

//     const { code } = data;
    
//     console.log(code);
    
//     if (code && code == 401) {
//       // const token = await getToken();
//       // if (!token) return Promise.reject(data.message);

//       try {
//         const { accessToken } = await refreshToken();

//         localStorage.setItem("token", JSON.stringify(accessToken));
//         config.headers["Authorization"] = `Bearer ${accessToken}`;
//         console.log('run>>>> ', accessToken);
        

//         return requestClient(config);
//       } catch (err) {
//         console.log(err);
//         localStorage.clear();
//         return Promise.reject(err);
//       }
//     }

//     return response;
//   },
//   (error) => {
//     console.log("Run o day roi");
    
//     return Promise.reject(error);
//   }
// );

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
          requestClient(config);
          // requestsToRefresh.forEach((cb) => cb(accessToken));
        } catch (err) {
          localStorage.clear();
          requestsToRefresh.forEach((cb) => cb(null));
          return Promise.reject(err);
        } finally {
          isRefreshToken = false;
          requestsToRefresh = [];
        }
      }

      return new Promise((resolve, reject) => {
        requestsToRefresh.push((token) => {
          if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
            resolve(requestClient(config));
          } else {
            reject(error);
          }
        });
      });
    }

    return Promise.reject(error);
  }
);