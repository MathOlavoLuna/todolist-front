import type UserType from './UserType';

export default interface ToDoType {
 id: number;
 title: string;
 content: string;
 done: boolean;
 priority: number;
 user: UserType;
}
