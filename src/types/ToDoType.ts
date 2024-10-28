import type UserType from './UserType';

export default interface ToDoType {
  id: number;
  title: string;
  content: string;
  done: boolean;
  priority: number;
  user: UserType;
  created_at: string;
  updated_at: string;
  expires_at?: string;
}
