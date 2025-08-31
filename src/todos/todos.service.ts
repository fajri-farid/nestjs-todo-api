import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { sortTodos } from './utils/todo-sort.util';

export interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class TodosService {
  private todos: Todo[] = [
    {
      id: 1,
      title: 'belajar nestjs',
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      title: 'belajar typescript',
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      title: 'belajar laravel',
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  private nextId = 4;

  findAll(): Todo[] {
    return this.todos;
  }

  findByFilters(
    isCompleted?: boolean,
    limit?: number,
    search?: string,
    orderBy?: 'createdAt' | 'updatedAt' | 'asc' | 'desc',
  ): Todo[] {
    let result = [...this.todos];

    if (isCompleted !== undefined) {
      result = result.filter((todo) => todo.isCompleted === isCompleted);
    }

    if (search !== undefined) {
      result = result
        .filter((todo) =>
          todo.title.toLowerCase().includes(search.toLowerCase()),
        )
        .sort(sortTodos);
    }

    if (limit !== undefined) {
      result = result.sort(sortTodos).slice(0, limit);
    }

    if (orderBy !== undefined) {
      switch (orderBy) {
        case 'asc':
          result = result.sort(
            (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
          );
          break;
        case 'desc':
          result = result.sort(
            (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
          );
          break;
        case 'updatedAt':
          result = result.sort(
            (a, b) => a.updatedAt.getTime() - b.updatedAt.getTime(),
          );
          break;
        case 'createdAt':
          result = result.sort(
            (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
          );
          break;
      }
    }

    return result;
  }

  findOneById(id: number): Todo | undefined {
    const todo = this.todos.find((todo) => todo.id === id);

    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    return todo;
  }

  createTodo(createTodoDto: CreateTodoDto): Todo {
    const newTodo: Todo = {
      id: this.nextId++,
      title: createTodoDto.title,
      isCompleted: createTodoDto.isCompleted,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  updateOneById(id: number, updateTodoDto: UpdateTodoDto): Todo {
    const todoId = this.findOneById(id);

    const editedTodo: Todo = {
      ...todoId,
      ...updateTodoDto,
      updatedAt: new Date(),
    } as Todo;

    this.todos = this.todos.map((t) => (t.id === id ? editedTodo : t));

    return editedTodo;
  }

  deleteOneById(id: number): void {
    this.findOneById(id);

    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
}
