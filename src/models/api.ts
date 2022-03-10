import axios from "axios";

export const fetcher = axios.create({
  baseURL: (import.meta.env.VITE_APP_API_BASE_URL as string) || "/api",
  withCredentials: true,
});

fetcher.interceptors.response.use((response) => {
  return {
    ...response,
    ...response.data,
  };
});

const Auth = {
  getSession: () => fetcher.get<any, any>("/auth/me"),
  login: (body: { username: string; password: string }) => fetcher.post<any, any>("/auth/session", body),
  logout: () => fetcher.get<any, any>("/auth/session"),
};

export default {
  Auth,
};
