<script setup lang="ts">
import { register } from '@/services/api';
import { reactive, ref, watch } from 'vue';
import bgImageRegister from "@/assets/pexels-tara-winstead-8386681.jpg"

  const name = ref<string>('');
  const surname = ref<string>('');
  const email = ref<string>('');
  const password = ref<string>('');
  const profileImage = ref<File>();

  const handleRegister = async () => {
    const response = await register(name.value, surname.value, email.value, password.value, profileImage.value)

    if(response){
      window.location.href = '/home2'
    }
  }

//   const uploadToCloudinary = async (file: File): Promise<string> => {
//   const cloudName = import.meta.env.VITE_CLOUD_NAME;
//   const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

//   const formData = new FormData();
//   formData.append('file', file);
//   formData.append('upload_preset', uploadPreset);

//   try {
//     const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
//     console.log('fez upload');
    
//     return response.data.secure_url;
//   } catch (error) {
//     console.error('Error uploading to Cloudinary:', error);
//     throw new Error('Failed to upload avatar');
//   }
// };

// const { previewAvatar, loadFileToPreview } = useAvatar();

// const bindCustomAvatar = (event: Event) => {
//   const input = event.target as HTMLInputElement;
//   if (!input.files || input.files.length === 0) {
//     return;
//   }
//   const file = input.files[0];
//   profileImage.value = loadFileToPreview(file);
// };

//   watch(profileImage, ()=>{
//     uploadToCloudinary(profileImage.value)    
//   })
</script>
<template>
  <v-container class="h-screen w-fill">
    <v-row class="h-100">
      <v-col cols="12" lg="12" class="d-flex justify-center align-center " >
        <div class="d-none d-lg-block h-50 text-white py-5 px-3 rounded-s-lg w-25" style="background-image: url('/src/assets/pexels-tara-winstead-8386681.jpg');
        background-size: cover;">
        <p class="text-h2 text-center">Agenda Online</p>
          <p class="text-h5 ms-4">Seus afazers em um só lugar</p>
        </div>
        <form class=" w-100 w-lg-25 d-flex flex-column align-center h-50 border-thin rounded-e-lg pa-5" >
            <div class="w-100 ">
              <v-text-field label="Nome" variant="outlined" v-model="name" color="primary"></v-text-field>
              <v-text-field label="Sobrenome" variant="outlined" v-model="surname" color="primary"></v-text-field>
              <v-text-field label="Email" variant="outlined" v-model="email" color="primary"></v-text-field>
              <v-text-field label="Senha" variant="outlined" v-model="password" color="primary"></v-text-field>
            </div>
            <!-- <label class="upload-avatar-label mt-3" for="avatar">
              <v-file-input class="d-none" accept="image/png, image/jpeg, image/jpg" label="Avatar"  id="avatar" aria-label="Upload avatar" v-model="profileImage" @change="bindCustomAvatar"></v-file-input>
              <v-avatar  :image="previewAvatar ?? defaultAvatar" size="120" aria-label="Current avatar" class="
              bg-secondary"></v-avatar>
            </label> usar na profileView-->
            <span class="d-flex justify-center w-100 mt-3">
              <v-btn color="primary w-50" @submit="handleRegister" type="submit">Criar</v-btn>
            </span>
          </form>
      </v-col>
    </v-row>
  </v-container>
</template>
