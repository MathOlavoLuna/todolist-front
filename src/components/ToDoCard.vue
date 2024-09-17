<script setup lang="ts">
import { editDone, getToDo, getToDoInfs, putToDo } from '@/services/api';
import type { ToDoType } from '@/types';
import { validatePriority } from '@/utils/validatePriority';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiSquare } from '@mdi/js';
import { ref, watch } from 'vue';

interface toDoProps {
 toDo: ToDoType;
}
defineProps<toDoProps>();

//Put ToDo
const title = ref<string>('');
const content = ref<string>('');
const priority = ref<string>('');

//Edit - Delete
const showClouds = ref<boolean>(false);

const path = mdiSquare;
const doneCheck = ref<boolean>(false);
const emits = defineEmits(['callGetToDo']);

async function handleEditDone(id: number) {
 const response = await editDone(id, !doneCheck.value); //negando o valor para que ele sempre faça o edit da maneira correta (tu anotou isso no word VUE)
 if (response) emits('callGetToDo');
}

async function handleGetToDoInfs(id: number) {
 const response = await getToDoInfs(id);
 if (response) return (title.value = response.data.title), (content.value = response.data.content); // temos que fazer a lógica para puxar a prioridade também.
}

async function handlePutToDo(id: number) {
 const validatedPriority = validatePriority(priority.value);
 const response = await putToDo(id, title.value, content.value, validatedPriority);
 if (response) emits('callGetToDo');
}

function showIcons() {
 showClouds.value = !showClouds.value;
}
</script>

<template>
 <v-row class="d-flex justify-center aling-center">
  <v-col cols="12" lg="9" @click="showIcons">
   <v-card class="mx-auto" max-width="1000" hover :class="{ 'opacity-50': toDo.done }">
    <v-card-item>
     <div class="d-flex align-center justify-space-between">
      <div class="text-lg-h5 text-phone">{{ toDo.title }}</div>
      <div v-if="toDo.priority === 1">
       <svg-icon v-if="toDo.priority" type="mdi" :path="path" class="text-green"></svg-icon>
      </div>
      <div v-else-if="toDo.priority === 2">
       <svg-icon v-if="toDo.priority" type="mdi" :path="path" class="text-yellow"></svg-icon>
      </div>
      <div v-else-if="toDo.priority === 3">
       <svg-icon type="mdi" :path="path" class="text-red"></svg-icon>
      </div>
     </div>
    </v-card-item>
    <v-card-text class="d-flex align-center justify-space-between">
     <div>{{ toDo.content }}</div>
     <label class="form-control">
      <input type="checkbox" :v-model="(doneCheck = toDo.done)" @click="handleEditDone(toDo.id)" :checked="doneCheck" />
     </label>
    </v-card-text>
   </v-card>
  </v-col>
  <v-col v-if="showClouds" cols="12" lg="3" class="d-flex flex-column">
   <v-dialog max-width="600" persistent>
    <template v-slot:activator="{ props: activatorProps }">
     <v-btn icon="mdi-pencil" size="default" class="btn-add-todo" v-bind="activatorProps" @click="handleGetToDoInfs(toDo.id)"></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
     <v-card prepend-icon="mdi mdi-pencil" title="Editar Tarefa">
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
       <v-btn text="Editar" color="primary" variant="tonal" @click="handlePutToDo(toDo.id), (isActive.value = false)"></v-btn>
       <v-btn text="Cancelar" @click="isActive.value = false"></v-btn>
      </v-card-actions>
     </v-card>
    </template>
   </v-dialog>
   <v-btn class="d-block" icon="mdi-delete" size="default"></v-btn
  ></v-col>
 </v-row>
</template>

<style scoped>
.form-control {
 font-family: system-ui, sans-serif;
 font-size: 2rem;
 font-weight: bold;
 line-height: 1.1;
 display: grid;
 grid-template-columns: 1.3rem auto;
}
input[type='checkbox'] {
 -webkit-appearance: none;
 appearance: none;
 background-color: #fff;
 margin: 0;
 font: inherit;
 color: currentColor;
 width: 1.15rem;
 height: 1.15rem;
 border: 0.1rem solid currentColor;
 border-radius: 0.15em;
 transform: translateY(-0.075em);
 display: grid;
 place-content: center;
}

.form-control + .form-control {
 margin-top: 1em;
}

input[type='checkbox']::before {
 content: '';
 width: 0.45em;
 height: 0.45em;
 transform: scale(0);
 transition: 120ms transform ease-in-out;
 box-shadow: inset 1em 1em green;
 background-color: CanvasText;
 transform-origin: bottom left;
 clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
}

input[type='checkbox']:checked::before {
 transform: scale(1);
}
@media (max-width: 500px) {
 .text-phone {
  font-size: 1.3rem;
  word-break: break-word;
 }

 .text-subtitle {
  font-size: 1.1rem;
  font-weight: 500;
  font-style: oblique;
 }
}
</style>
