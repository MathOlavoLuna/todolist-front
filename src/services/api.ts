import axios from 'axios';
const client = axios.create({
 baseURL: 'http://127.0.0.1:8000/api/',
 headers: {
  'Content-Type': 'application/json'
 }
});

const config = {
 headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
};

export const login = async (email: string, password: string) => {
 try {
  const response = await client.post('login', {
   email,
   password
  });

  if (response.status === 200) {
   localStorage.setItem('token', response.data.data.token);
   return true;
  }
  return false;
 } catch (error) {
  console.log(error);
 }
};

export const getUser = async () => {
 const response = await client.get('user', config);
 return response.data.data;
};

export const getToDo = async (pageNumber: number) => {
 //para lógica do paginatio funcionar, temos que tornar a url dinâmica ao inves de fazermos o gaet na toDo apenas, temos que passar a page.
 try {
  const response = await client.get(`toDo?page=${pageNumber}`, config);

  if (response.status === 200) {
   return response.data.data;
  }

  return false;
 } catch (error) {
  console.log(error);
 }
};

export const getToDoInfs = async (id: number) => {
 const response = await client.get(`toDo/${id}`, config);
 if (response.status === 200) {
  return response.data;
 }
 return false;
};

export const editDone = async (id: number, done: boolean) => {
 try {
  const response = await client.put(
   `toDo/${id}`,
   {
    done
   },
   config
  );

  if (response.status === 200) {
   return response.data.msg;
  }

  return response.data.msg;
 } catch (error) {
  console.log(error);
 }
};

export const postToDo = async (title: string, content: string, priority: number) => {
 try {
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
 } catch (error) {
  console.log(error);
 }
};

export const putToDo = async (id: number, title: string, content: string, priority: number) => {
 try {
  const response = await client.put(
   `toDo/${id}`,
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
 } catch (error) {
  console.log(error);
 }
};
