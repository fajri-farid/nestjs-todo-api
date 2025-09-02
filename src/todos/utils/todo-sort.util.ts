import { Todo } from '../todos.service';

export function sortTodos(a: Todo, b: Todo): number {
  // Priority 1: incomplete todos (false) first
  if (a.isCompleted !== b.isCompleted) {
    return a.isCompleted ? 1 : -1; // false on top, true at the bottom
  }
  // Priority 2: newest createdAt first
  return b.createdAt.getTime() - a.createdAt.getTime();
}
