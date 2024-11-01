import { useRouter } from 'vue-router';

export function checkLogged(url: string) {
  const logged = localStorage.getItem('token');
  const router = useRouter();
  if (logged) {
    router.push(url);
  } else {
    router.push('/login');
  }
}
