import { createApp } from 'vue';
import App from './App.vue';
import HomePage from './pages/Home.vue';
import AcercaDePage from './pages/AcercaDe.vue';
import LoginPage from './pages/auth/Login.vue';
import RegisterPage from './pages/auth/Register.vue';
import LoaderComponent from './components/Loader.vue';
import ProductosListadoPage from './pages/productos/Listado.vue';
import ProductosAdicionarPage from './pages/productos/Adicionar.vue';
import ProductosEditarPage from './pages/productos/Editar.vue';
import { createRouter, createWebHistory } from 'vue-router';
import store from './store/index';

// Importar
// eslint-disable-next-line no-unused-vars
import axiosInterceptor from './utility/axios-token-interceptor';

// ***********************************
// 1. Registro de Rutas para páginas
// ***********************************
const routes = [
  { path: '/', component: HomePage },
  { path: '/acerca-de', component: AcercaDePage },
  // Gestión de usuarios
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  // Productos
  { path: '/productos/', component: ProductosListadoPage },
  { path: '/productos/adicionar', component: ProductosAdicionarPage },
  { path: '/productos/editar/:id', component: ProductosEditarPage, props: true },
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
app.use(store);
app.mount('#app');
