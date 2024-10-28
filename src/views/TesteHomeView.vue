<script setup lang="ts">
import SideBarComponent from '@/components/SideBarComponent.vue';
</script>

<template>
  <v-container fluid class="h-screen pa-0 ma-0">
    <v-row class="h-100 pa-0 ma-0">
      <v-col cols="12" lg="2" class="bg-yellow-lighten-5">
        <side-bar-component />
      </v-col>
      <v-col cols="12" lg="10" class="bg-yellow-lighten-5"></v-col>
    </v-row>
  </v-container>
</template>
<style scoped></style>
