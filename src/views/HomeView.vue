<script setup lang="ts">
import HelloUser from '@/components/HelloUser.vue';
import NavBar from '@/components/NavBar.vue';
import ToDoCard from '@/components/ToDoCard.vue';
import SvgIcon from '@jamescoyle/vue-icon';
import {} from '@mdi/js';
import { getToDo, getUser, postToDo } from '@/services/api';
import type { ToDoType } from '@/types';
import { checkLogged } from '@/utils/checkLogged';
import { onMounted, ref, watch } from 'vue';
import { validatePriority } from '@/utils/validatePriority';

const toDos = ref<ToDoType[]>();
//newToDo
const title = ref<string>('');
const content = ref<string>('');
const priority = ref<string>('');

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
 localStorage.setItem('user', JSON.stringify(response));
};

const handlePostToDo = async () => {
 const validatedPriority = validatePriority(priority.value);
 const response = await postToDo(title.value, content.value, validatedPriority);

 if (response) {
  alert('A fazer atribuído.');
  handleGetToDo();
 } else {
  alert('A fazer não atribuído.');
 }
};

onMounted(() => {
 spinner.value = true;
 checkLogged('/');
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
    <HelloUser />
   </v-col>
  </v-row>
  <div v-if="spinner" class="d-flex justify-center align-center h-75 w-100">
   <v-progress-circular color="black" indeterminate :size="59" :width="5"></v-progress-circular>
  </div>
  <ToDoCard :to-do="toDo" v-for="toDo in toDos" :key="toDo.id" @call-get-to-do="handleGetToDo" />

  <v-row>
   <v-col cols="12" class="mb-14"> <v-pagination v-model="page" :length="lastPage" rounded="circle" @click="handleGetToDo()"></v-pagination></v-col>
  </v-row>

  <v-dialog max-width="600" persistent>
   <template v-slot:activator="{ props: activatorProps }">
    <v-btn icon="mdi-plus" size="large" class="btn-add-todo" v-bind="activatorProps"></v-btn>
   </template>

   <template v-slot:default="{ isActive }">
    <v-card prepend-icon="mdi mdi-playlist-plus" title="Adicionar Tarefa">
     <v-card-text>
      <v-row>
       <v-col cols="12" lg="12">
        <v-text-field label="Título" variant="underlined" clearable required v-model="title" maxlength="40"></v-text-field>
       </v-col>
       <v-col cols="12" lg="12">
        <v-text-field label="Conteúdo" variant="underlined" clearable v-model="content"></v-text-field>
       </v-col>
      </v-row>
      <v-row>
       <v-col cols="12" lg="12">
        <v-label> Prioridade </v-label>
        <v-combobox v-model="priority" :items="['Baixa', 'Média', 'Alta']" variant="underlined"></v-combobox>
       </v-col>
      </v-row>
     </v-card-text>

     <v-card-actions>
      <v-btn text="Adicionar" color="primary" variant="tonal" @click="handlePostToDo(), (isActive.value = false)"></v-btn>
      <v-btn text="Cancelar" @click="isActive.value = false"></v-btn>
     </v-card-actions>
    </v-card>
   </template>
  </v-dialog>
 </v-container>
</template>
<style scoped>
.btn-add-todo {
 position: fixed;
 right: 0;
 bottom: 0;
 z-index: 1;
 margin-right: 20%;
 margin-bottom: 2%;
}

@media (max-width: 1200px) {
 .btn-add-todo {
  opacity: 80%;
  margin-right: 4%;
  margin-bottom: 6%;
 }
}
</style>
