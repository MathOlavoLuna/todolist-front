<script setup lang="ts"></script>
<template>
  <v-container class="h-screen w-screen">
    <v-row>
      <v-col cols="12" lg="12">
        <form max-width="600" max-height="600px">
          <v-textarea label="Nome" variant="outlined"></v-textarea>
          <v-textarea label="Email" variant="outlined"></v-textarea>
          <v-textarea label="Senha" variant="outlined"></v-textarea>
          <v-file-input label="Imagem de perfil" variant="outlined"></v-file-input>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>
