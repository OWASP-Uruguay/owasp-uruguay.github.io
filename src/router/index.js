import { createRouter, createWebHistory } from "vue-router";
import AppSecDays2025 from "../views/AppSecDays2025/AppSecDays2025.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "appsecdays2025",
      component: AppSecDays2025,
    },
  ],
});

export default router;
