<template>
  <div>
      <router-view v-if="!isAuthenticated" /> <!-- Muestra solo el login -->
      <AppLayout v-else /> <!-- Muestra el layout en las vistas autenticadas -->
  </div>
</template>

<script>
import AppLayout from "./components/AppLayout.vue";

export default {
  components: {
      AppLayout
  },
  computed: {
      isAuthenticated() {
          return !!localStorage.getItem('authToken');
      }
  }
};
</script>
