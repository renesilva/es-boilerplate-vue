<template>
  <div>
    <h1>{{ mensaje }} <i class="bi bi-arrow-right-circle"></i></h1>
    <div class="dropdown">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
      >
        Dropdown button
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li><a class="dropdown-item" href="#">Action</a></li>
        <li><a class="dropdown-item" href="#">Another action</a></li>
        <li><a class="dropdown-item" href="#">Something else here</a></li>
      </ul>
      <loader-component></loader-component>
    </div>
  </div>
</template>
<script>
import { api } from '@/config/site.config';
export default {
  name: 'HomePage',
  data() {
    return {
      mensaje: 'Hola!',
    };
  },
  methods: {},
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  watch: {},
  created() {},
  mounted() {
    if (this.loggedIn) {
      api.get('profile/myProfile').then((response) => console.log(response.data));
    }
  },
  components: {},
  // Se pueden utilizar estos hooks para el ciclo de vida
  // beforeCreate, created, beforeMount, mounted, beforeUpdate, updated
  // activated, deactivated, beforeUnmount, unmounted
};
</script>

<style scoped></style>
