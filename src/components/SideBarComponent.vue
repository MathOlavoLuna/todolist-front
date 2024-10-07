<template lang="">
  <v-card>
    <v-layout>
      <v-navigation-drawer expand-on-hover rail class="bg-blue">
        <v-list>
          <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg" subtitle="sandra_a88@gmailcom" title="Sandra Adams"></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav class="d-flex flex-column justify-center h-75">
          <v-list-item prepend-icon="mdi-format-list-checks" title="Tarefas" value="myfiles"></v-list-item>
          <v-list-item prepend-icon="mdi-calendar-blank" title="Agenda" value="shared"></v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-layout>
  </v-card>
</template>
<script setup lang="ts"></script>
<style lang=""></style>
