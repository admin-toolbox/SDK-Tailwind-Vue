import { createRouter, createWebHistory, Router } from "vue-router";

export const registerPWA = (router: Router) => {
  router.isReady().then(async () => {
    const { registerSW } = await import("virtual:pwa-register");
    registerSW({ immediate: true });
  });
};

import { setupLayouts } from "virtual:generated-layouts";
import generatedRoutes from "virtual:generated-pages";
const automaticRoutes = setupLayouts(generatedRoutes);

export const router = createRouter({
  history: createWebHistory(), // import.meta.env.BASE_URL was prob not needed.
  scrollBehavior() {
    return { top: 0 };
  },
  strict: true,
  linkActiveClass: "active",
  routes: [
    ...automaticRoutes,
  ],
});
