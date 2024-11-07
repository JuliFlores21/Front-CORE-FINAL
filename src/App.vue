<template>
  <div>
    <AppLayout>
      <router-view v-if="isAuthenticated" /> <!-- Muestra las vistas autenticadas -->
      <LoginView v-else /> <!-- Muestra el login cuando no está autenticado -->
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "./components/AppLayout.vue";
import LoginView from "./views/LoginView.vue";

export default {
  components: {
      AppLayout,
      LoginView
  },
  computed: {
      isAuthenticated() {
          return !!localStorage.getItem('authToken');
      }
  }
};
</script>
