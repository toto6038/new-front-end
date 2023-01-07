import axios from "axios";
import { useGlobal } from "../stores/global";

export const fetcher = axios.create({
  baseURL: (import.meta.env.VITE_APP_API_BASE_URL as string) || "/api",
  withCredentials: true,
});

fetcher.interceptors.response.use((response) => {
  return {
    ...response,
    ...response.data,
  };
}, error => {
  const global = useGlobal();
  if (error?.response?.status >= 500) {
    global.onServerError();
  }
});

const Auth = {
  getSession: () => fetcher.get<UserProperties>("/auth/me"),
  login: (body: { username: string; password: string }) => fetcher.post("/auth/session", body),
  logout: () => fetcher.get("/auth/session"),
  changePassword: (body: { oldPassword: string; newPassword: string }) =>
    fetcher.post("/auth/change-password", body),
};

const Problem = {
  create: (body: EditableProblem) => fetcher.post("/problem/manage", body),
};

const Submission = {
  create: (body: { problemId: number; languageType: number }) => fetcher.post<{ submissionId: string }>("/submission", body),
  modify: (id: string, body: FormData) =>
    fetcher.put(`/submission/${id}`, body, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  rejudge: (id: string) => fetcher.get(`/submission/${id}/rejudge`),
};

const Copycat = {
  detect: (body: { course: string; problemId: number; studentNicknames: { [k: string]: string } }) =>
    fetcher.post("/copycat", body),
};

const Announcement = {
  create: (body: AnnouncementCreationForm) => fetcher.post<{ annId: string }>("/ann", body),
  modify: (body: AnnouncementEditionForm) => fetcher.put("/ann", body),
}

export default {
  Auth,
  Problem,
  Submission,
  Copycat,
  Announcement,
};
