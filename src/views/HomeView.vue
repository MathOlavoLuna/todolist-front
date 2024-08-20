<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import ToDoCard from '@/components/ToDoCard.vue';
import { getTodo, postTodo } from '@/services/api';
import type { ToDoType } from '@/types';
import { checkLogged } from '@/utils/checkLogged';
import { onMounted, ref } from 'vue';

const toDos = ref<ToDoType[]>();

const title = ref<string>('');
const content = ref<string>('');
const priority = ref<string | number>('');

if (priority.value === 'Baixa') {
  priority.value = 1;
} else if (priority.value === 'Média') {
  priority.value = 2;
} else {
  priority.value = 3;
}
const handleGetTodo = async () => {
  const response = await getTodo();

  if (response) {
    toDos.value = response;
    return true;
  }
  return false;
};

const handlePostTodo = async () => {
  const response = await postTodo(title.value, content.value, priority.value);

  if (response) {
    console.log('A fazer atribuído.');
  } else {
    console.log('A fazer não atribuído.');
  }
};

onMounted(() => {
  checkLogged('/');
  handleGetTodo();
});
</script>

<template>
  <div class="h-screen d-flex flex-column align-center justify-center">
    <v-container class="bg-blue h-100 pa-0">
      <v-row>
        <v-col cols="12" lg="12">
          <NavBar class="bg-cyan" />
        </v-col>
      </v-row>

      <v-row class="ml-5 align-center">
        <v-col cols="12" lg="12" md="12">
          <span>Good Afternoon Matheus</span>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-container>
            <v-row>
              <ToDoCard :to-do="toDo" v-for="toDo in toDos" :key="toDo.id" />
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>

  <v-dialog max-width="600" persistent>
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn icon="mdi-plus" size="large" class="btn-add-todo" v-bind="activatorProps"></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card prepend-icon="mdi mdi-playlist-plus" title="Adicionar Tarefa">
        <v-card-text>
          <v-row>
            <v-col cols="12" lg="12">
              <v-text-field
                label="Título"
                variant="underlined"
                clearable
                required
                v-model="title"
                maxlength="40"
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="12">
              <v-text-field
                label="Conteúdo"
                variant="underlined"
                clearable
                v-model="content"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" lg="12">
              <v-label> Prioridade </v-label>
              <v-combobox
                v-model="priority"
                :items="['Baixa', 'Média', 'Alta']"
                variant="underlined"
              ></v-combobox>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-btn text="Adicionar" color="primary" variant="tonal" @click="handlePostTodo()"></v-btn>
          <v-btn text="Cancelar" @click="isActive.value = false"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<style scoped>
.btn-add-todo {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 1;
  margin-right: 23.5%;
  margin-bottom: 4%;
}

@media (max-width: 1200px) {
  .btn-add-todo {
    opacity: 80%;
    margin-right: 4%;
    margin-bottom: 6%;
  }
}
</style>
