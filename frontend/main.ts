import App from "./App.vue";

import { createPinia } from "pinia";
const pinia = createPinia();

import { createApp, h } from "vue";
const Vue = createApp({
  render: () => h(App),
});

Vue.use(pinia);

import { pageTitle } from "vue-page-title";
Vue.use(pageTitle({ mixin: true, suffix: "- ACME Company" }));

import { router }  from './router';
Vue.use(router);

import { VueQueryPlugin } from "vue-query";
Vue.use(VueQueryPlugin);

import 'tw-elements';

Vue.mount("#app");