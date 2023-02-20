import chinese from "./zh-tw.json";
import english from "./en.json";
import taiwanese from "./zh-min-nan.json";

export const config = {
  legacy: false,
  locale: "english",
  fallbackLocale: "chinese",
  messages: {
    chinese,
    english,
    taiwanese,
  },
};
