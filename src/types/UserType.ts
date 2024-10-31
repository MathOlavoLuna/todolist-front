import type ToDoType from './ToDoType';

export default interface UserType {
  id: string;
  name: string;
  surname: string;
  email: string;
  profileImage: string;
  todo?: ToDoType;
}
