import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./index.css";
import "vue-prism-editor/dist/prismeditor.min.css";

createApp(App).use(createPinia()).use(router).mount("#app");
