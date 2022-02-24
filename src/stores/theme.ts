import { defineStore } from "pinia";

export const useThemeStore = defineStore("theme", {
  state: () => {
    return {
      isDark: false,
    };
  },
  actions: {
    setIsDark(val: boolean) {
      this.isDark = val;
    },
  },
});
