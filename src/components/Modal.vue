<script setup lang="ts">
import type ModalType from '@/types/ModalType';
import { ref } from 'vue';

interface ModalProps {
  modal: ModalType;
}

const title = ref<string>('');
const content = ref<string>('');
const priority = ref<string>('');

defineProps<ModalProps>();
</script>
<template>
  <v-dialog max-width="600" persistent>
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        icon="mdi-{{ modal.icon }}"
        size="{{ modal.size }}"
        class="btn-add-todo"
        v-bind="activatorProps"
        @click="
          {
            {
              modal.firstBtnFunction;
            }
          }
        "
      ></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card prepend-icon="mdi {{ modal.modalIcon }}" title="{{ modal.modalTitle }}">
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
            text="Adicionar"
            color="primary"
            variant="tonal"
            @click="
              {
                {
                  modal.secondBtnFunction;
                }
              }
              isActive.value = false;
            "
          ></v-btn>
          <v-btn text="Cancelar" @click="isActive.value = false"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<style></style>
