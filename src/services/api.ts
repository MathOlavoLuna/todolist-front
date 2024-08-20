import axios from 'axios';
const client = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  headers: {
    'Content-Type': 'application/json'
  }
});

const config = {
  headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await client.post('login', {
      email,
      password
    });

    if (response.status === 200) {
      sessionStorage.setItem('token', response.data.data.token);
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
  }
};

export const getTodo = async () => {
  try {
    const response = await client.get('toDo', config);

    if (response.status === 200) {
      return response.data.data;
    }

    return false;
  } catch (error) {
    console.log(error);
  }
};

export const postTodo = async (title: string, content: string, priority: string) => {
  const response = await client.post(
    'toDo',
    {
      title,
      content,
      priority
    },
    config
  );

  if (response.status === 200) {
    console.log(response);

    return true;
  }

  return false;
};
