import axios, {
  Method,
  AxiosResponse,
  AxiosError,
  AxiosRequestHeaders,
} from "axios";
import User from "./User";
import Todo from "./Todo";
import Config from "@/app/common/Config/Config";

const api = axios.create({
  baseURL: Config.backendAPi.baseUrl,
  withCredentials: true,
});

class Api {
  user: ReturnType<typeof User>;
  todo: ReturnType<typeof Todo>;

  constructor() {
    this.user = User(this);
    this.todo = Todo(this);
  }

  post(
    url: string,
    params: unknown,
    data: unknown,
    headers?: AxiosRequestHeaders
  ) {
    return this.send(url, "POST", params, data, headers);
  }

  put(
    url: string,
    params: unknown,
    data: unknown,
    headers?: AxiosRequestHeaders
  ) {
    return this.send(url, "PUT", params, data, headers);
  }

  get(
    url: string,
    params: unknown,
    data: unknown,
    headers?: AxiosRequestHeaders
  ) {
    return this.send(url, "GET", params, data, headers);
  }

  delete(
    url: string,
    params: unknown,
    data: unknown,
    headers?: AxiosRequestHeaders
  ) {
    return this.send(url, "DELETE", params, data, headers);
  }

  patch(
    url: string,
    params: unknown,
    data: unknown,
    headers?: AxiosRequestHeaders
  ) {
    return this.send(url, "PATCH", params, data, headers);
  }

  send(
    url: string,
    method: Method,
    params: unknown,
    data: unknown,
    headers?: AxiosRequestHeaders
  ) {
    const isClient = typeof window !== "undefined";
    const defaultHeaders = {
      "Content-Type":
        isClient && data instanceof FormData
          ? "multipart/form-data"
          : "application/json",
      Authorization:
        isClient && localStorage.getItem("accessToken")
          ? `Bearer ${localStorage.getItem("accessToken")}`
          : "",
    };
    return new Promise((resolve, reject) => {
      api({
        url,
        method,
        params,
        headers: { ...defaultHeaders, ...headers },
        data,
      })
        .then((response) => {
          if (response.data.access && isClient) {
            localStorage.setItem("accessToken", response.data.access);
          }
          if (response.data.refresh && isClient) {
            localStorage.setItem("refreshToken", response.data.refresh);
          }
          resolve(response.data);
        })
        .catch((error: AxiosError) => reject(error.response?.data));
    });
  }

  login(email: string, password: string): Promise<{ access: string }> {
    return new Promise((resolve, reject) => {
      api
        .post("/api/auth/login/", { email, password })
        .then((response: AxiosResponse) => {
          if (response.data) {
            localStorage.setItem("accessToken", response.data.access);
            localStorage.setItem("refreshToken", response.data.refresh);
          }
          resolve(response.data);
        })
        .catch((error: AxiosError) => reject(error.response?.data));
    });
  }
}

export default new Api();
