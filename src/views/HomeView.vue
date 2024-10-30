<script setup lang="ts">
import HelloUser from '@/components/HelloUser.vue';
import NavBar from '@/components/NavBar.vue';
import ToDoCard from '@/components/ToDoCard.vue';
import {} from '@mdi/js';
import { getToDo, getUser, postToDo } from '@/services/api';
import type { ToDoType, UserType } from '@/types';
import { checkLogged } from '@/utils/checkLogged';
import { onMounted, ref, watch } from 'vue';
import { priorityToNumber } from '@/utils/validatePriority';
import Modal from '@/components/Modal.vue';
import type ModalType from '@/types/ModalType';

const toDos = ref<ToDoType[]>();
const helloUserActive = ref<boolean>(false);

//Pagination
const page = ref<number>(1);
const lastPage = ref<number>(0);

//Spinner
const spinner = ref<boolean>(false);

const handleGetToDo = async () => {
  const response = await getToDo(page.value);
  lastPage.value = response.last_page;

  if (response) {
    toDos.value = response.data;
    spinner.value = false;
    return true;
  }
  return false;
};

const handleGetUser = async () => {
  const response = await getUser();
  helloUserActive.value = true;
  localStorage.setItem('user', JSON.stringify(response));
};

onMounted(() => {
  checkLogged('/');
  spinner.value = true;
  handleGetUser();
  handleGetToDo();
});
</script>

<template>
  <v-container class="h-100 pa-0 bg-blue" fluid>
    <v-row>
      <v-col cols="12" lg="12">
        <NavBar class="bg-cyan" />
      </v-col>
    </v-row>
    <v-row class="ml-5 align-center">
      <v-col cols="12" lg="12" md="12">
        <div v-if="helloUserActive"><HelloUser /></div>
      </v-col>
    </v-row>
    <div v-if="spinner" class="d-flex justify-center align-center h-75 w-100">
      <v-progress-circular color="black" indeterminate :size="59" :width="5"></v-progress-circular>
    </div>
    <ToDoCard :to-do="toDo" v-for="toDo in toDos" :key="toDo.id" @call-get-to-do="handleGetToDo" />

    <v-row>
      <v-col cols="12" class="mb-14"> <v-pagination v-model="page" :length="lastPage" rounded="circle" @click="handleGetToDo()"></v-pagination></v-col>
    </v-row>
  </v-container>
</template>
<style scoped></style>
