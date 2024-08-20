import type ToDoType from './ToDoType';

export default interface UserType {
  id: string;
  name: string;
  email: string;
  todo: ToDoType;
}
