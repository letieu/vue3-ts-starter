import "./plugins/axios";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";
import { createPinia } from "pinia";
import Element from "./plugins/element";
import { me } from "@/utils/auth"

me()

createApp(App)
  .use(router)
  .use(createPinia())
  .use(Element)
  .mount("#app");
