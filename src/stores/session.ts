import { defineStore } from "pinia";
import api from "../models/api";

enum SessionState {
  NotValidated = -1,
  IsNotLogin = 0,
  IsLogin = 1,
}
enum UserRole {
  Guest = -1,
  Admin = 0,
  Teacher = 1,
  Student = 2,
}

export const useSession = defineStore("session", {
  state: () => {
    return {
      state: -1 as SessionState,
      username: "",
      displayedName: "",
      role: -1 as UserRole,
      bio: "",
      email: "",
    };
  },
  getters: {
    isAdmin(state) {
      return state.role === UserRole.Admin;
    },
    isNotValidated(state) {
      return state.state === SessionState.NotValidated;
    },
    isNotLogin(state) {
      return state.state === SessionState.IsNotLogin;
    },
    isLogin(state) {
      return state.state === SessionState.IsLogin;
    },
  },
  actions: {
    async validateSession() {
      this.state = SessionState.NotValidated;
      try {
        const { username, displayedName, bio, role, email } = (await api.Auth.getSession()).data;
        this.username = username;
        this.displayedName = displayedName;
        this.bio = bio;
        this.role = role;
        this.email = email;
        this.state = SessionState.IsLogin;
      } catch (error) {
        // 403 means not login
        this.state = SessionState.IsNotLogin;
        // FIXME: show server error ui when fetch session failed (500)
      }
    },
  },
});
