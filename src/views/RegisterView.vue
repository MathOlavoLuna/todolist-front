<template>
  <form @submit.prevent="createUser">
    <input type="text" placeholder="name" v-model="user.userName" />
    <div v-if="erros.includes('name')">{{ erros }}</div>
    <input type="email" placeholder="email" v-model="user.userEmail" />
    <div></div>
    <input type="text" placeholder="password" v-model="user.userPassword" />
    <div></div>
    <button type="submit">SUBMITA</button>
  </form>
</template>

<script setup lang="ts">
import { registerUser } from '@/services/api';
import type RegisterType from '@/types/RegisterType';
import { reactive } from 'vue';

const user = reactive<RegisterType>({
  userName: 'Matheus',
  userEmail: 'mathluna@gmal.com',
  userPassword: '123'
});

const erros = reactive([]);

async function createUser() {
  try {
    const response = await registerUser(user.userName, user.userEmail, user.userPassword);
    erros.push(response.data.error);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
</script>

<style scoped></style>
