import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { jwtDecode } from "jwt-decode";
import { REFRESH_TOKEN_ROUTE } from "@/actions/api.route";
import { getToken } from "@/lib/utils";

export class APIClient {
  private client: AxiosInstance;

  constructor(baseURL: string, timeout = 20000) {
    this.client = axios.create({
      baseURL,
      timeout,
      withCredentials: true,
    });

    this.initializeRequestInterceptor();
  }

  private initializeRequestInterceptor() {
    this.client.interceptors.request.use(async (config) => {
      const token = await getToken();

      if (token) {
        const { exp }: any = jwtDecode(token);

        if (Date.now() >= exp * 1000) {
          try {
            const { data } = await axios.post(REFRESH_TOKEN_ROUTE);

            localStorage.setItem("accessToken", data.accessToken);
            config.headers.Authorization = `Bearer ${data.accessToken}`;
          } catch (error) {
            console.error("Refresh token expired, logging out...");
            localStorage.clear();
            window.location.href = "/sign-in";
          }
        } else {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }

      return config;
    });
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url, config);
  }

  public async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data, config);
  }

  public async put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.put<T>(url, data, config);
  }

  public async patch<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.put<T>(url, data, config);
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.delete<T>(url, config);
  }
}
