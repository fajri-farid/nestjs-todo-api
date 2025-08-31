import { Todo } from '../todos.service';

export function sortTodos(a: Todo, b: Todo): number {
  // Prioritas 1: todo yang belum selesai (false) duluan
  if (a.isCompleted !== b.isCompleted) {
    return a.isCompleted ? 1 : -1; // false di atas, true di bawah
  }
  // Prioritas 2: createdAt terbaru duluan
  return b.createdAt.getTime() - a.createdAt.getTime();
}
