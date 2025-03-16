import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import { createPinia } from "pinia";
import { es } from "./i18n/es";
import { en } from "./i18n/en";
import router from "./router";
import App from "./App.vue";

import materialKit from "./material-kit";

const i18n = createI18n({
  legacy: false,
  locale: window.navigator.language,
  fallbackLocale: "en",
  messages: {
    es,
    en,
  },
});

const app = createApp(App);

app.use(createPinia());
app.use(i18n);
app.use(router);
app.use(materialKit);
app.mount("#app");
