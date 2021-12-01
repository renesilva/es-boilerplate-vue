import { createApp } from 'vue';
import App from './App.vue';
import HomePage from './pages/Home.vue';
import AcercaDePage from './pages/AcercaDe.vue';
import LoaderComponent from './components/Loader.vue';

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

// ***********************************
// 2. Registro de Componentes Globales
// ***********************************
app.component('loader-component', LoaderComponent);
// ***********************************

app.use(router);
app.mount('#app');
