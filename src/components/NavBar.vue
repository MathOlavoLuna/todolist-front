<script setup lang="ts">
import { logout } from '@/services/api';

const handleLogOut = () => {
  logout();
  localStorage.removeItem('token');
};
</script>

<template>
  <nav class="d-flex align-center justify-space-around py-3">
    <RouterLink to="/login" class="text-lg-h6 text-black d-flex" icon="">
      <v-icon icon=" mdi-arrow-left-drop-circle" size="large" color="white" @click="handleLogOut"></v-icon>
    </RouterLink>
    <img
      width="64"
      height="64"
      src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-to-do-list-productivity-flaticons-lineal-color-flat-icons.png"
      alt="external-to-do-list-productivity-flaticons-lineal-color-flat-icons"
    />
    <RouterLink to="/"></RouterLink>
  </nav>
</template>

<style scoped>
nav {
  height: 100%;
}

nav > a {
  text-decoration: none;
}
</style>
