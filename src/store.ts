import { defineStore } from 'pinia';
import { getUser } from './services/api';
import type { UserType } from './types';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user = ref<UserType | null>(null);

  const fetchUser = async () => {
    const data = await getUser();
    user.value = data;
    console.log(user.value);
  };

  return { user, fetchUser };
});
