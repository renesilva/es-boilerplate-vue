<template>
  <div>
    <div class="container">
      <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <router-link
          to="/"
          class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
        >
          <i class="bi bi-bootstrap-fill me-2"></i>
          <span class="fs-4">Simple header</span>
        </router-link>
        <ul class="nav nav-pills">
          <template v-for="(navOption, index) in navOptions" :key="index">
            <li class="nav-item">
              <router-link
                class="nav-link"
                :class="this.$route.path === navOption.route ? 'active' : ''"
                :to="navOption.route"
                >{{ navOption.text }}
              </router-link>
            </li>
          </template>
          <template v-if="loggedIn">
            <li class="nav-item">
              <a class="nav-link" href="#" @click="logout">Cerrar Sesión</a>
            </li>
          </template>
        </ul>
      </header>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div>
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import './assets/scss/stylesheet.scss';

export default {
  name: 'App',
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/');
    },
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    navOptions() {
      let navOptions = [
        {
          route: '/',
          text: 'Inicio',
        },
        {
          route: '/acerca-de',
          text: 'Acerca de',
        },
      ];
      if (this.loggedIn) {
        let loggedInOptions = {
          route: '/productos',
          text: 'Productos',
        };
        // se pueden agregar opciones extra cuando inicie sesión
        navOptions = [...navOptions, loggedInOptions];
      }
      return navOptions;
    },
  },
  watch: {},
  mounted() {},
  // Se pueden utilizar estos hooks para el ciclo de vida
  // beforeCreate, created, beforeMount, mounted, beforeUpdate, updated
  // activated, deactivated, beforeUnmount, unmounted
};
</script>

<style scoped></style>
