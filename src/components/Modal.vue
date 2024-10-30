<script setup lang="ts">
import { getToDoInfs } from '@/services/api';
import type ModalType from '@/types/ModalType';

import { ref } from 'vue';

interface ModalProps {
  modal: ModalType;
  idToDoInfs?: number;
}
defineProps<ModalProps>();

const modalFunctions = defineEmits<{
  handlePostToDo: [title: string, content: string, priority: string];
  handlePutToDo: [id: number, title: string, content: string, priority: string];
}>();

const title = ref<string>('');
const content = ref<string>('');
const priority = ref<string>('');

function clearFields() {
  title.value = '';
  content.value = '';
  priority.value = '';
}

clearFields();
</script>
<template>
  <v-dialog max-width="600" persistent>
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn :icon="modal.icon" :size="modal.size" :class="{ 'btn-add-todo': !idToDoInfs }" v-bind="activatorProps"></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card :prepend-icon="modal.modalIcon" :title="modal.modalTitle">
        <v-card-text>
          <v-row>
            <v-col cols="12" lg="12">
              <v-text-field label="Título" variant="underlined" clearable required maxlength="40" v-model="title"></v-text-field>
            </v-col>
            <v-col cols="12" lg="12">
              <v-text-field label="Conteúdo" variant="underlined" clearable v-model="content"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" lg="12">
              <v-label> Prioridade </v-label>
              <v-combobox :items="['Baixa', 'Média', 'Alta']" variant="underlined" v-model="priority"></v-combobox>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-btn
            :text="idToDoInfs ? 'Editar' : 'Adicionar'"
            color="primary"
            variant="tonal"
            @click="idToDoInfs ? modalFunctions('handlePutToDo', idToDoInfs, title, content, priority) : modalFunctions('handlePostToDo', title, content, priority), (isActive.value = false)"
          >
          </v-btn>
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
