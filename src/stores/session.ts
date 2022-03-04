import { defineStore } from "pinia";
import api from "../models/api";

export const useSession = defineStore("session", {
  state: () => {
    return {
      isFetching: false,
      isLogin: false,
      username: "",
      displayedName: "",
      role: -1,
      bio: "",
      email: "",
    };
  },
  getters: {
    isAdmin: (state) => state.role === 0,
  },
  actions: {
    async validateSession() {
      this.isFetching = true;
      try {
        const { username, displayedName, bio, role, email } = await api.Auth.getSession();
        this.username = username;
        this.displayedName = displayedName;
        this.bio = bio;
        this.role = role;
        this.email = email;
        this.isLogin = true;
      } catch (error) {
        // FIXME: show server error ui when fetch session failed
        this.isLogin = false;
      } finally {
        this.isFetching = false;
      }
    },
  },
});
