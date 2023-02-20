import chinese from "./zh-tw.json";
import english from "./en.json";
import taiwanese from "./zh-min-nan.json";

export const config = {
  legacy: false,
  locale: localStorage.getItem("locale") || "english",
  fallbackLocale: "english",
  messages: {
    chinese,
    english,
    taiwanese,
  },
};
