<script setup lang="ts">
import HelloUser from '@/components/HelloUser.vue';
import ToDoCard from '@/components/ToDoCard.vue';
import { getToDo } from '@/services/api';
import { useUserStore } from '@/store';
import type { ToDoType } from '@/types';
import { onMounted, ref } from 'vue';

const toDos = ref<ToDoType[]>();
//Pagination
const page = ref<number>(1);
const lastPage = ref<number>(0);
const spinner = ref<boolean>(false);

const userStore = useUserStore();
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
onMounted(() => {
  userStore.fetchUser();
  handleGetToDo();
});
</script>

<template>
  <div class="bg-red" expand-on-hover></div>
  <v-container fluid class="h-screen pa-0 ma-0">
    <v-row class="h-100 pa-0 ma-0">
      <v-col cols="12" lg="2" class="bg-yellow-lighten-5">
        <v-card>
          <v-layout>
            <v-navigation-drawer expand-on-hover rail class="bg-blue">
              <v-list class="h-25">
                <v-list-item class="pb-5" prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg" :subtitle="userStore.user?.email" :title="userStore.user?.name"></v-list-item>
                <v-divider></v-divider>
              </v-list>

              <v-list density="compact" nav class="d-flex flex-column justify-center h-50">
                <v-list-item prepend-icon="mdi-check" title="Tasks"></v-list-item>
                <v-list-item prepend-icon="mdi-calendar-check" title="Calendar"></v-list-item>
              </v-list>
            </v-navigation-drawer>
          </v-layout>
        </v-card>
      </v-col>

      <v-col cols="12" lg="10" class="bg-yellow-lighten-5 d-flex flex-wrap">
        <ToDoCard :to-do="toDo" v-for="toDo in toDos" :key="toDo.id" @call-get-to-do="handleGetToDo" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style></style>
