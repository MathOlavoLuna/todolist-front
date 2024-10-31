<script setup lang="ts">
import HelloUser from '@/components/HelloUser.vue';
import Modal from '@/components/Modal.vue';
import ToDoCard from '@/components/ToDoCard.vue';
import { getToDo, postToDo } from '@/services/api';
import { useUserStore } from '@/store';
import type { ToDoType } from '@/types';
import type ModalType from '@/types/ModalType';
import { priorityToNumber } from '@/utils/validatePriority';
import { onMounted, ref } from 'vue';

const toDos = ref<ToDoType[]>();

const modalHome: ModalType = { icon: 'mdi-plus', modalIcon: 'mdi mdi-playlist-plus', modalTitle: 'Adicionar Tarefa', size: 'large' };

//Pagination
const page = ref<number>(1);
const lastPage = ref<number>(0);
const spinner = ref<boolean>(false);

const userStore = useUserStore();

//async functions
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

const handlePostToDo = async (title: string, content: string, priority: string) => {
  const validatedPriority = priorityToNumber(priority);
  const response = await postToDo(title, content, validatedPriority);
  if (response) {
    alert('A fazer atribuído.');
    handleGetToDo();
  } else {
    alert('A fazer não atribuído.');
  }
};

onMounted(() => {
  userStore.fetchUser();
  handleGetToDo();
});
</script>

<template>
  <div expand-on-hover></div>
  <v-container fluid class="h-screen pa-0 ma-0">
    <v-row class="h-100 pa-0 ma-0">
      <v-col cols="12" lg="1" class="bg-secondary">
        <v-card style="z-index: 9999">
          <v-layout>
            <v-navigation-drawer expand-on-hover rail class="bg-primary">
              <v-list>
                <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg" :subtitle="userStore.user?.email" :title="userStore.user?.name"></v-list-item>
              </v-list>

              <v-divider></v-divider>

              <v-list density="default" nav>
                <v-list-item prepend-icon="mdi-check" title="Tarefas" value="tarefas"></v-list-item>
                <v-list-item prepend-icon="mdi-calendar-check" title="Calendário" value="calendario"></v-list-item>
              </v-list>
            </v-navigation-drawer>
          </v-layout>
        </v-card>
      </v-col>

      <v-col cols="12" lg="11" class="bg-secondary d-flex flex-wrap">
        <ToDoCard :to-do="toDo" v-for="toDo in toDos" :key="toDo.id" @call-get-to-do="handleGetToDo" />
      </v-col>
      <Modal :modal="modalHome" @handle-post-to-do="handlePostToDo" />
    </v-row>
  </v-container>
</template>

<style scoped></style>
