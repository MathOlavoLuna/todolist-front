<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import { login } from '@/services/api';
import { checkLogged } from '@/utils/checkLogged';
import { onMounted, ref } from 'vue';

const email = ref<string>('');
const password = ref<string>('');

async function handleLogin() {
 const response = await login(email.value, password.value);

 if (response) {
  console.log('login efetuado');
  window.location.href = '/';
 } else {
  console.log('login mal sucedido');
 }
}

onMounted(() => {
 checkLogged('/');
});
</script>

<template>
 <NavBar />
 <v-form>
  <v-text-field label="email" v-model="email"> </v-text-field>
  <v-text-field label="password" v-model="password"> </v-text-field>
  <v-btn color="success" size="large" variant="elevated" block @click="handleLogin"> Sign In </v-btn>
 </v-form>
</template>

<style></style>
