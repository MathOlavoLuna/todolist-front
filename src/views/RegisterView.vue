<script setup lang="ts">
import { register } from '@/services/api';
import axios from 'axios';
import { reactive, ref, watch } from 'vue';

  const name = ref<string>('');
  const surname = ref<string>('');
  const email = ref<string>('');
  const password = ref<string>('');
  const profileImage = ref<File>();

  const previewImage = ref<boolean>(false);

  const handleRegister = async () => {
    const response = await register(name.value, surname.value, email.value, password.value, profileImage.value)

    if(response){
      window.location.href = '/home2'
    }
  }

  const uploadToCloudinary = async (file: File): Promise<string> => {
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  try {
    const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
    console.log('fez upload');
    
    return response.data.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Failed to upload avatar');
  }
};

  watch(profileImage, ()=>{
    previewImage.value = true;
    uploadToCloudinary(profileImage.value)    
  })
</script>
<template>
  <v-container class="h-screen w-fill">
    <v-row class="h-100">
      <v-col cols="12" lg="12" class="w-100 h-100 d-flex flex-column justify-center align-center">
        <form class=" w-100 w-lg-25 d-flex flex-column align-center">
            <div class="w-100 w-lg-100 ">
              <v-text-field label="Nome" variant="outlined" v-model="name"></v-text-field>
              <v-text-field label="Sobrenome" variant="outlined" v-model="surname"></v-text-field>
              <v-text-field label="Email" variant="outlined" v-model="email"></v-text-field>
              <v-text-field label="Senha" variant="outlined" v-model="password"></v-text-field>
              <v-file-input class="d-none" accept="image/png, image/jpeg, image/jpg" label="Avatar"  id="avatar" aria-label="Upload avatar" v-model="profileImage"></v-file-input>
            </div>
            <label class="upload-avatar-label mt-3" for="avatar">
              <v-avatar  :image="profileImage ?? './src/assets/defaultAvatar.svg'" size="120" aria-label="Current avatar" class="
              bg-secondary"></v-avatar>
            </label>
            <span class="d-flex justify-center w-100 mt-3">
              <v-btn color="primary w-50" @submit="handleRegister" type="submit">Criar</v-btn>
            </span>
          </form>
      </v-col>
    </v-row>
  </v-container>
</template>
