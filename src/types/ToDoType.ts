import type UserType from './UserType';

export default interface ToDoType {
  id: string;
  title: string;
  content: string;
  done: boolean;
  priority: number;
  user: UserType;
}
