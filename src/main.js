import { createApp } from 'vue';
import App from './App.vue';
import HomePage from './pages/Home.vue';
import AcercaDePage from './pages/AcercaDe.vue';

import { createRouter, createWebHistory } from 'vue-router';

// ***********************************
// 1. Registro de Rutas para páginas
// ***********************************
const routes = [
  { path: '/', component: HomePage },
  { path: '/acerca-de', component: AcercaDePage },
];
// ***********************************

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const app = createApp(App);

app.use(router);

app.mount('#app');
